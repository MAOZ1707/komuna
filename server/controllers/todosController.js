const Todos = require("../models/todosModel");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const chalk = require("chalk");

const DUMMY_TODOS = [
	{
		id: 1,
		category: "payments",
		title: "pay to water bill",
		body: "pay 50$ to dates: 11/1-12/1",
		createAt: "10/1/2020",
		creatorID: 2,
	},
];

exports.getAllTodos = async (req, res, next) => {
	try {
		const todos = await Todos.find();

		res.status(200).json({
			data: {
				todos,
			},
		});
	} catch (error) {
		const err = new HttpError(
			"Fetching Todos failed, please try again later.",
			404
		);
		return next(err);
	}
};

exports.getTodoByUserId = async (req, res, next) => {
	try {
		const userId = req.params.id;

		const userTodo = await User.findById(userId);

		res.status(200).json({
			data: {
				todos: userTodo,
			},
		});
	} catch (error) {
		const err = new HttpError(
			"Fetching User Todo failed, please try again later.",
			404
		);
		return next(err);
	}
};

exports.getTodoById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const todo = await Todos.findById(id);

		res.status(200).json({
			data: {
				todo,
			},
		});
		console.log(chalk.bgGreenBright("GET success"));
	} catch (error) {
		const err = new HttpError(
			"Fetching this Todo failed, please try again later.",
			404
		);
		return next(err);
	}
};

exports.createTodos = async (req, res, next) => {
	console.log(chalk.bgBlue(req.body));
	try {
		const newTodos = await Todos.create(req.body);
		res.json({
			data: {
				todos: newTodos,
			},
		});
		console.log(chalk.bgGreenBright("Create success"));
	} catch (error) {
		const err = new HttpError(
			"Create Todo is failed, please check again .",
			404
		);
		return next(err);
	}
};
exports.updateTodos = async (req, res, next) => {
	console.log(req.id);

	console.log(chalk.bgBlue(req.body));
	try {
		const todoToUpdate = req.params.id;

		const updateTodos = await Todos.findByIdAndUpdate(todoToUpdate, req.body, {
			new: true,
		});
		res.json({
			data: {
				todos: updateTodos,
			},
		});

		console.log(chalk.bgGreenBright("Update success"));
	} catch (error) {
		console.log(chalk.bold.red(error));
		const err = new HttpError(
			"Update Todo is failed, please check again .",
			404
		);
		return next(err);
	}
};
exports.deleteTodos = async (req, res, next) => {
	try {
		const todoId = req.params.id;

		await Todos.findByIdAndDelete(todoId);

		console.log(chalk.bgGreenBright("Delete success"));
		res.json({ data: null });
	} catch (error) {
		console.log(chalk.bold.red(error));
		const err = new HttpError(
			"Update Todo is failed, please check again .",
			404
		);
		return next(err);
	}
};
