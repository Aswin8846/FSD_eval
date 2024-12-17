package routes

import (
	"project/database"
	"project/models"
	"github.com/gofiber/fiber/v2"
	"regexp"
	"time"
)

func Setup(app *fiber.App) {
	app.Post("/employees", CreateEmployee)
}

func CreateEmployee(c *fiber.Ctx) error {
	var employee models.Employee

	if err := c.BodyParser(&employee); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	if !isValidEmployeeID(employee.EmployeeID) {
		return c.Status(400).JSON(fiber.Map{"error": "Employee ID must be alphanumeric and at most 10 characters"})
	}

	if !isValidEmail(employee.Email) {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid email format"})
	}

	if !isValidPhoneNumber(employee.PhoneNumber) {
		return c.Status(400).JSON(fiber.Map{"error": "Phone number must be 10 digits with no special characters"})
	}

	var existingEmployee models.Employee
	if result := database.DB.Where("employee_id = ?", employee.EmployeeID).First(&existingEmployee); result.Error == nil {
		return c.Status(400).JSON(fiber.Map{"error": "Employee ID already exists"})
	}

	joiningDate, err := time.Parse("2006-01-02", employee.DateOfJoining)
	if err != nil || joiningDate.After(time.Now()) {
		return c.Status(400).JSON(fiber.Map{"error": "Date of Joining cannot be a future date"})
	}


	if result := database.DB.Create(&employee); result.Error != nil {
		return c.Status(400).JSON(fiber.Map{"error": result.Error.Error()})
	}

	return c.Status(201).JSON(employee)
}



func isValidEmployeeID(employeeID string) bool {

	re := regexp.MustCompile(`^[a-zA-Z0-9]{1,10}$`)
	return re.MatchString(employeeID)
}

func isValidEmail(email string) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(email)
}

func isValidPhoneNumber(phone string) bool {
	re := regexp.MustCompile(`^[0-9]{10}$`)
	return re.MatchString(phone)
}
