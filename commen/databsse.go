package commen

import (
	"7/mod"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

var DB *gorm.DB
var DBContent *gorm.DB

func InitDb() *gorm.DB {
	driverName := viper.GetString("datasource.diverName")
	host := viper.GetString("datasource.host")
	port := viper.GetString("datasource.port")
	database := viper.GetString("datasource.database")
	username := viper.GetString("datasource.username")
	password := viper.GetString("datasource.password")
	charset := viper.GetString("datasource.charset")
	args := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=true",
		username,
		password,
		host,
		port,
		database,
		charset)
	db, err := gorm.Open(driverName, args)
	if err != nil {
		panic("failed to connect database .err: " + err.Error())
	}
	db.AutoMigrate(&mod.User{})
	DB = db
	return db
}

func GetDB() *gorm.DB {
	return DB
}
func GetDBContent() *gorm.DB {
	return DBContent
}
