package main

import (
	"7/commen"
	"7/config"
	"7/routes"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/spf13/viper"
)

func main() {
	config.InitConfig()
	commen.InitDB()
	defer commen.CloseDB()
	r := gin.Default()
	r = routes.CollectRouter(r)
	panic(r.Run(":" + viper.GetString("server.port")))
}
