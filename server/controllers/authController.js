const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

const chalk = require("chalk");

exports.signup = async (req, res, next) => {
	const { firstname, lastname, email, password } = req.body;

	console.log(req.body);

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		const err = new HttpError("Signup failed, please try again later .", 404);
		return next(err);
	}

	if (existingUser) {
		console.log(true);
		const err = new HttpError("User exists already, please login instead.", 422);
		return next(err);
	}

	try {
		const newUser = await User.create({
			firstname,
			lastname,
			email,
			password,
			image: req.file.path,
		});

		res.status(201).json({
			user: newUser,
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
	} catch (error) {
		const err = new HttpError("Login failed, please try again later.", 500);
		return next(err);
	}

	if (!existingUser || password !== existingUser.password) {
		const err = new HttpError("Login failed, could not log you in.", 401);
		return next(err);
	}

	res.json({ message: "Logged in!", user: existingUser });
};
