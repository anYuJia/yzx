package config

import (
	"github.com/spf13/viper"
	"log"
	"os"
)

func InitConfig() {
	wordir, _ := os.Getwd()
	viper.SetConfigName("application")
	viper.SetConfigType("yml")
	viper.AddConfigPath(wordir + "/config")
	err := viper.ReadInConfig()
	if err != nil {
		log.Println("配置读取失败", err)
	}
}
