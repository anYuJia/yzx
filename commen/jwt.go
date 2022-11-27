package commen

import (
	"7/mod"
	"github.com/dgrijalva/jwt-go"
	"time"
)

var jwtKey = []byte("who_is_ypy")

type Claims struct {
	Username string
	jwt.StandardClaims
}

func ReleaseToken(user mod.User) (string, error) {
	expirationTime := time.Now().Add(5 * 24 * time.Hour)
	claims := &Claims{
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			Issuer:    "ypy",
			Subject:   "user token",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func ParseToken(tokenString string) (*jwt.Token, *Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	return token, claims, err
}
