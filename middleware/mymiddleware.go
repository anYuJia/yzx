package middleware

import (
	"7/commen"
	"7/mod"
	"github.com/gin-gonic/gin"
	"strings"
)

func AuthorMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		tokenString := context.GetHeader("Authorization")
		if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
			context.JSON(400, gin.H{"code": 400, "msg": "权限不足"})
			context.Abort()
			return
		}
		tokenString = tokenString[7:]
		token, claim, err := commen.ParseToken(tokenString)
		if err != nil || !token.Valid {
			context.JSON(401, gin.H{"code": 401, "msg": "权限不足"})
			context.Abort()
			return
		}
		username := claim.Username
		DB := commen.GetDB()
		var user mod.User
		DB.Where("username = ?", username).First(&user)
		if user.Username == "" {
			context.JSON(402, gin.H{"code": 402, "msg": "权限不足"})
			context.Abort()
			return
		}
		context.Set("user", user)
		context.Next()
	}
}
