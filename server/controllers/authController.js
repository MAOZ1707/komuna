const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

const chalk = require("chalk");

exports.signup = async (req, res, next) => {
	const { email } = req.body;

	let hasUser;
	try {
		hasUser = await User.findOne({ email });
		if (hasUser) {
			throw new HttpError("Signup failed, email already exist.", 422);
		}
	} catch (error) {
		const err = new HttpError("Signup failed, please try again later 2.", 404);
		return next(err);
	}

	let newUser;

	try {
		newUser = await User.create(req.body);

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
	try {
		const { email, password } = req.body;

		const userIdentifier = await User.findOne({ email });

		// TODO ---  ADD -> !userIdentifier || userIdentifier.password !== password
		if (!userIdentifier) {
			throw new HttpError("Login failed, could not find a user", 401);
		}
		console.log(chalk.yellow.bold("Login Success !! "));

		res.json({ data: userIdentifier });
	} catch (error) {
		const err = new HttpError("Login failed, please try again .", 404);
		return next(err);
	}
};
