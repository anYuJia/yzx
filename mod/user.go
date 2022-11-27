package mod

type UserDto struct {
	Username string `json:"username"`
}

func GetUsername(user User) UserDto {
	return UserDto{
		Username: user.Username,
	}
}
