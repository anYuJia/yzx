package control

import (
	"7/commen"
	"7/mod"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(context *gin.Context) {
	username := context.PostForm("username")
	password := context.PostForm("password")
	DB := commen.GetDB()
	var user mod.User
	DB.Where("username = ?", username).First(&user)
	if user.Username == username {
		context.JSON(200, gin.H{
			"code": 200,
			"msg":  "该用户已经被用过咯，换一个试试吧！"})
		return
	}
	if len(password) <= 6 {
		context.JSON(201, gin.H{
			"code": 201,
			"msg":  "密码必须要大于6位噢"})
		return
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	newuser := mod.User{
		Username: username,
		Password: string(hashPassword),
	}
	DB.Create(&newuser)
	context.JSON(202, gin.H{
		"code": 202,
		"msg":  "注册成功"})
}

func Login(context *gin.Context) {
	username := context.PostForm("username")
	password := context.PostForm("password")
	DB := commen.GetDB()
	var user mod.User
	DB.Where("username = ?", username).First(&user)
	if user.Username == "" {
		context.JSON(200, gin.H{
			"code": 200,
			"msg":  "该用户未注册,请先注册吧"})
		return
	}
	if len(password) <= 6 {
		context.JSON(201, gin.H{
			"code": 201,
			"msg":  "密码必须要大于6位噢"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		context.JSON(202, gin.H{
			"code": 202,
			"msg":  "密码错误"})
		return
	}
	token, err := commen.ReleaseToken(user)
	if err != nil {
		context.JSON(503, gin.H{
			"code": 503,
			"msg":  "token生成失败",
		})
		return
	}
	context.JSON(203, gin.H{
		"code": 203,
		"msg":  "登陆成功",
		"data": gin.H{"token": token},
	})

}

func Info(context *gin.Context) {
	user, _ := context.Get("user")
	context.JSON(200, gin.H{
		"code": 200,
		"data": gin.H{
			"user": user,
		},
	})
}
