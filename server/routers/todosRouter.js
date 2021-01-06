const express = require("express");
const todosController = require("../controllers/todosController");

const checkAuth = require("../middleware/auth-validate");

const router = express.Router();

router.route("/").get(todosController.getAllTodos);

router
	.route("/user/:id")
	.get(todosController.getTodosByUserId)
	.delete(todosController.deleteTodosByUserId);
router.route("/:id").get(todosController.getTodoById);

// check TOKEN middleware
router.use(checkAuth);

router.route("/").post(todosController.createTodos);

router
	.route("/:id")
	.post(todosController.createTodos)
	.patch(todosController.updateTodos)
	.delete(todosController.deleteTodos);

module.exports = router;
