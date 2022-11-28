package routes

import (
	"7/control"
	"7/middleware"
	"github.com/gin-gonic/gin"
)

func CollectRouter(r *gin.Engine) *gin.Engine {
	r.POST("/register", control.Register)
	r.POST("/login", control.Login)
	r.POST("/rePassword", control.RePassword)
	r.GET("/info", middleware.AuthorMiddleware(), control.Info)
	r.POST("/insertContent", control.InsertContent)
	r.POST("/index", control.Index)
	r.POST("/star", control.Star)
	return r
}
