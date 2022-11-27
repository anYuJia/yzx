package middleware

import (
	"7/commen"
	"7/mod"
	"7/response"
	"github.com/gin-gonic/gin"
	"strings"
)

func AuthorMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		tokenString := context.GetHeader("Authorization")
		if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
			response.Fail(context, gin.H{}, "权限不足")
			context.Abort()
			return
		}
		tokenString = tokenString[7:]
		token, claim, err := commen.ParseToken(tokenString)
		if err != nil || !token.Valid {
			response.Fail(context, gin.H{}, "权限不足")
			context.Abort()
			return
		}
		username := claim.Username
		DB := commen.GetDB()
		var user mod.User
		DB.Where("username = ?", username).First(&user)
		if user.Username == "" {
			response.Fail(context, gin.H{}, "权限不足")
			context.Abort()
			return
		}
		context.Set("user", mod.GetUsername(user))
		context.Next()
	}
}
