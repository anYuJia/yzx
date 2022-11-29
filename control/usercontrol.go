package control

import (
	"7/commen"
	"7/mod"
	"7/response"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
)

func Register(context *gin.Context) {
	username := context.PostForm("username")
	password := context.PostForm("password")
	log.Println("username:" + username + "   " + "password:" + password)
	DB := commen.GetDB()
	var user mod.User
	DB.Where("username = ?", username).First(&user)
	if user.Username == username {
		response.Fail(context, gin.H{}, "该用户已经被用过咯，换一个试试吧！")
		return
	}
	if len(password) <= 6 {
		response.Fail(context, gin.H{}, "密码必须要大于6位噢")
		return
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	newuser := mod.User{
		Username: username,
		Password: string(hashPassword),
	}
	DB.Create(&newuser)
	response.Success(context, gin.H{}, "注册成功")
}

func Login(context *gin.Context) {
	username := context.PostForm("username")
	password := context.PostForm("password")
	log.Println("username:" + username + "   " + "password:" + password)
	DB := commen.GetDB()
	var user mod.User
	DB.Where("username = ?", username).First(&user)
	if user.Username == "" {
		response.Fail(context, gin.H{}, "该用户未注册，请先注册吧！！")
		return
	}
	if len(password) <= 6 {
		response.Fail(context, gin.H{}, "密码必须要大于6位噢")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		response.Fail(context, gin.H{}, "密码错误")
		return
	}
	token, err := commen.ReleaseToken(user)
	if err != nil {
		response.Fail(context, gin.H{}, "token生成失败")
		return
	}
	response.Success(context, gin.H{"token": token}, "登录成功")
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

func InsertContent(context *gin.Context) {
	username := context.PostForm("username")
	content := context.PostForm("content")
	time := context.PostForm("time")
	parentContent := context.PostForm("parentContent")
	DBContent := commen.GetDBContent()
	userCon := mod.UserCon{
		Username:       username,
		Time:           time,
		Content:        content,
		ParentsContent: parentContent,
	}
	DBContent.Create(&userCon)
	response.Response(context, http.StatusOK, 200, gin.H{"data": content}, "评论成功")
}

func Index(context *gin.Context) {
	var userCons []mod.UserCon
	DB := commen.GetDBContent()
	DB.Find(&userCons)
	response.Success(context, gin.H{"data": userCons}, "ok")
}

func RePassword(context *gin.Context) {
	username := context.PostForm("username")
	password := context.PostForm("password")
	DB := commen.GetDB()
	var user mod.User
	DB.Where("username = ?", username).First(&user)
	if user.Username != username {
		response.Fail(context, gin.H{}, "用户名·不存在")
		return
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err == nil {
		response.Fail(context, gin.H{}, "密码不能和之前一样噢")
		return
	}
	DB.Model(&user).Updates(map[string]interface{}{"username": username, "password": hashPassword})
}

func Star(context *gin.Context) {
	content := context.PostForm("content")
	db := commen.GetDBContent()
	var userContent mod.UserCon
	db.Where("content = ?", content).First(&userContent)
	db.Model(&userContent).Updates(map[string]interface{}{"content": content, "star": userContent.Star + 1})
	response.Success(context, gin.H{"star": userContent.Star + 1}, "点赞成功")
}
