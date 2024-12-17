package models

import (
	"gorm.io/gorm"
)
type Employee struct {
	gorm.Model
	Name          string `json:"name"`
	EmployeeID    string `json:"employee_id" gorm:"unique"`
	Email         string `json:"email" gorm:"unique"`
	PhoneNumber   string `json:"phone_number"`
	Department    string `json:"department"`
	DateOfJoining string `json:"date_of_joining"`
	Role          string `json:"role"`
}

