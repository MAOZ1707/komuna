const Todos = require("../models/todosModel");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const chalk = require("chalk");

exports.getAllTodos = async (req, res, next) => {
	try {
		const todos = await Todos.find();

		res.status(200).json({
			data: {
				todos,
			},
		});
	} catch (error) {
		const err = new HttpError("Fetching Todos failed, please try again later.", 404);
		return next(err);
	}
};

exports.getTodosByUserId = async (req, res, next) => {
	const userId = req.params.id;

	let userTodos;
	try {
		userTodos = await Todos.find({ creator: userId });
	} catch (error) {
		const err = new HttpError("Fetching User Todo failed, please try again later.", 404);
		return next(err);
	}

	if (!userTodos || userTodos.length === 0) {
		const err = new HttpError("Could not find todos for the provided user id", 404);
		return next(err);
	}

	res.status(200).json({
		todos: userTodos,
	});
};

exports.getTodoById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const todo = await Todos.findById(id);

		res.status(200).json({
			todo,
		});
		console.log(chalk.bgGreenBright("GET success"));
	} catch (error) {
		const err = new HttpError("Fetching this Todo failed, please try again later.", 404);
		return next(err);
	}
};

exports.createTodos = async (req, res, next) => {
	let user;
	try {
		user = await User.findById(req.body.creator);
	} catch (err) {
		const error = new HttpError("Creating todo failed, please try again.", 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError("Could not find user for provided id.", 404);
		return next(error);
	}

	try {
		const newTodo = await Todos.create(req.body);

		res.status(201).json({
			data: {
				todos: newTodo,
			},
		});
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
};

exports.updateTodos = async (req, res, next) => {
	console.log(chalk.bgCyanBright.black("Request"), req.body);
	const todoToUpdate = req.params.id;
	let todo;
	try {
		todo = await Todos.findById(todoToUpdate);

		console.log(chalk.bgWhiteBright.black(todo));
	} catch (error) {
		const err = new HttpError("Update Todo is failed, please check again .", 404);
		return next(err);
	}

	if (todo.creator.toString() !== req.userData.userId) {
		const err = new HttpError("You dont have permission.", 401);
		return next(err);
	}

	try {
		const todoId = await Todos.findByIdAndUpdate(todoToUpdate, req.body, {
			new: true,
		});
		res.json({
			todos: todoId,
		});

		console.log(chalk.bgWhiteBright.black("Update success"));
	} catch (error) {
		console.log(chalk.bold.red(error));
		const err = new HttpError("Update Todo is failed, please check again .", 404);
		return next(err);
	}
};

exports.deleteTodos = async (req, res, next) => {
	try {
		const todoId = req.params.id;

		await Todos.findByIdAndDelete(todoId);

		console.log(chalk.bgGreenBright.black("Delete success"));
		res.json({ data: null });
	} catch (error) {
		console.log(chalk.bold.red(error));
		const err = new HttpError("Update Todo is failed, please check again .", 404);
		return next(err);
	}
};
