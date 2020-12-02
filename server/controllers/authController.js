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

exports.active = async (req, res, next) => {
	const activeUser = await User.findOne({ email: req.body.email });
	try {
		res.status(201).json({
			status: "success",
			data: {
				user: activeUser,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error,
		});
	}
};
// exports.userHome = async (req, res, next) => {
// 	const doc = await Home.findOne({ user: req.params.id });
// 	try {
// 		res.status(201).json({
// 			status: "success",
// 			data: {
// 				user: doc,
// 			},
// 		});
// 	} catch (error) {
// 		res.status(400).json({
// 			status: "error",
// 			message: error,
// 		});
// 	}
// };
exports.userHome = async (req, res, next) => {
	try {
		console.log(req.body);
		const newHome = await Home.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				home: {
					home: newHome,
				},
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error,
		});
	}
};
