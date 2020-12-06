const express = require("express");
const todosController = require("../controllers/todosController");

const router = express.Router();

router
	.route("/")
	.get(todosController.getAllTodos)
	.post(todosController.createTodos);

router
	.route("/:id")
	.get(todosController.getTodoById)
	.patch(todosController.updateTodos)
	.delete(todosController.deleteTodos);

router.route("/user/:id").get(todosController.getTodosByUserId);

module.exports = router;
