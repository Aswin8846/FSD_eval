package database

import (
	"project/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB


func Connect() {
	dsn := "root:haywin$8846@tcp(localhost:3306)/form1?charset=utf8mb4&parseTime=True&loc=Local" 

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	if err := DB.AutoMigrate(&models.Employee{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	
}
