package mod

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"type:varchar(20);not null;unique"`
	Password string `gorm:"type:varchar(160);not null"`
}
type UserCon struct {
	gorm.Model
	Username       string `gorm:"type:varchar(20);not null"`
	Time           string `gorm:"type:varchar(25);not null;unique"`
	Content        string `gorm:"type:varchar(50);not null"`
	ParentsContent string `gorm:"type:varchar(50);not null"`
}
