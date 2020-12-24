const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		const err = new HttpError("User exists already, please login instead.", 422);
		return next(err);
	}

	const newUser = await User.create({
		firstname,
		lastname,
		email,
		password: hashedPassword,
		image: req.file.path,
	});

	const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.status(201).json({
		token,
		user: newUser,
	});
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

	if (!existingUser) {
		const err = new HttpError("Login failed, could not log you in.", 401);
		return next(err);
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (error) {
		const err = new HttpError("Login failed, please check your credentials.", 500);
		return next(err);
	}

	if (!isValidPassword) {
		const error = new HttpError("Invalid password.", 401);
		return next(error);
	}

	const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.status(201).json({
		token,
		user: existingUser,
	});
};
