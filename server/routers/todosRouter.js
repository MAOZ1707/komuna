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

router.get("/user/:id").get(todosController.getTodoByUserId);

module.exports = router;
