const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

const chalk = require("chalk");

exports.signup = async (req, res, next) => {
	const { firstname, lastname, email, password } = req.body;

	console.log(req.body);
	let hasUser;
	try {
		hasUser = await User.findOne({ email });
	} catch (error) {
		const err = new HttpError("Signup failed, please try again later 2.", 404);
		return next(err);
	}

	if (hasUser) {
		console.log(true);
		const error = new HttpError(
			"User exists already, please login instead.",
			422
		);
		return next(error);
	}

	try {
		const newUser = await User.create({
			firstname,
			lastname,
			email,
			password,
			todos: [],
		});

		res.status(201).json({
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		const err = new HttpError("Signup failed, please try again later.", 404);
		return next(err);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;

	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError("Login failed, please try again later.", 500);
		return next(error);
	}

	if (!existingUser || password !== existingUser.password) {
		const error = new HttpError("Login failed, could not log you in.", 401);
		return next(error);
	}

	res.json({ message: "Logged in!" });
};
