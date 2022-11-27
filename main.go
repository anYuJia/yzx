package main

import (
	"7/commen"
	"7/routes"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db := commen.InitDb()
	defer db.Close()
	r := gin.Default()
	r = routes.CollectRouter(r)
	panic(r.Run(":9999"))
}
