package routes

import (
    "log"
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

    log.Println("Received request:", string(c.Body()))

    if err := c.BodyParser(&employee); err != nil {
        log.Println("Error parsing body:", err)
        return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
    }

    log.Println("Parsed employee:", employee)

    if !isValidEmployeeID(employee.EmployeeID) {
        log.Println("Invalid Employee ID:", employee.EmployeeID)
        return c.Status(400).JSON(fiber.Map{"error": "Employee ID must be alphanumeric and at most 10 characters"})
    }

    if !isValidEmail(employee.Email) {
        log.Println("Invalid Email:", employee.Email)
        return c.Status(400).JSON(fiber.Map{"error": "Invalid email format"})
    }

    if !isValidPhoneNumber(employee.PhoneNumber) {
        log.Println("Invalid Phone Number:", employee.PhoneNumber)
        return c.Status(400).JSON(fiber.Map{"error": "Phone number must be 10 digits with no special characters"})
    }

    joiningDate, err := time.Parse("2006-01-02", employee.DateOfJoining)
    if err != nil || joiningDate.After(time.Now()) {
        log.Println("Invalid Date of Joining:", employee.DateOfJoining)
        return c.Status(400).JSON(fiber.Map{"error": "Date of Joining cannot be a future date"})
    }

    var existingEmployee models.Employee
    if result := database.DB.Where("employee_id = ?", employee.EmployeeID).First(&existingEmployee); result.Error == nil {
        log.Println("Employee ID already exists:", employee.EmployeeID)
        return c.Status(400).JSON(fiber.Map{"error": "Employee ID already exists"})
    }

    if result := database.DB.Create(&employee); result.Error != nil {
        log.Println("Error creating employee:", result.Error)
        return c.Status(400).JSON(fiber.Map{"error": result.Error.Error()})
    }

    log.Println("Employee created successfully:", employee)
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
