package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	fmt.Print("Hello World")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // Allow requests from this origin
	}))

	app.Get("/check", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	todos := []Todo{}

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		//Body Parser is used to parse the body data and bind it to the struct
		if err := c.BodyParser(todo); err != nil {
			return err
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)
		return c.JSON(todos)
	})

	app.Patch("/api/todos/:id/done", func(c *fiber.Ctx) error {
		fmt.Print("Checking Done Status")
		id, err := c.ParamsInt("id")
		if err != nil {
			return c.SendString("Error with id")
		}
		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}
		print("Okay done")
		return c.JSON(todos)
	})

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON((todos))
	})
	app.Listen(":4000")
}
