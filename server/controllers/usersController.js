const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
	try {
		//Build the query
		// Filtering
		const queryObj = { ...req.query };
		const excludedField = ["page", "sort", "limit", "field"];
		excludedField.forEach((ele) => delete queryObj[ele]);

		let query = User.find(req.query);

		// Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(",");
			query = query.sort(sortBy);
		}
		// Execute the query
		const users = await query;

		// Send the response
		res.status(200).json({
			status: "success",
			users: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};

exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json({
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
				users: newUser,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: "Invalid data sent!",
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		console.log(req.body);
		const id = req.params.id;
		console.log(id);
		const userUpdate = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
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
