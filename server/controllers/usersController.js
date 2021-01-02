const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
	let users;
	try {
		users = await User.find();
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}

	res.json({
		users,
	});
};

exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};

exports.createUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error,
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const userUpdate = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json({
			status: "success",
			data: {
				user: userUpdate,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "error",
			message: "Invalid data sent!",
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: "error",
			message: "Invalid data sent!",
		});
	}
};
