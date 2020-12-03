const User = require("../models/userModel");
const Home = require("../models/homeModel");

exports.signup = async (req, res, next) => {
	try {
		console.log(req.body);
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
