const Home = require("../models/homeModel");

exports.getHome = async (req, res) => {
	try {
		const home = await Home.find(req.query);

		res.status(200).json({
			status: "success",
			home: home.length,
			data: {
				home,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};

exports.getHomeById = async (req, res) => {
	try {
		const homeId = req.params.id;
		const home = await Home.findById(homeId);
		res.status(200).json({
			data: {
				home,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};

exports.creatHome = async (req, res) => {
	try {
		const newHome = await Home.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				home: newHome,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};

exports.deleteHome = async (req, res) => {
	try {
		await Home.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};
