package routes

import (
	"7/control"
	"7/middleware"
	"github.com/gin-gonic/gin"
)

func CollectRouter(r *gin.Engine) *gin.Engine {
	r.POST("/register", control.Register)
	r.POST("/login", control.Login)
	r.GET("/info", middleware.AuthorMiddleware(), control.Info)
	r.POST("insertContent", control.InsertContent)
	return r
}
