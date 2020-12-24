const jwt = require("jsonwebtoken");
const HttpError = require("../models/errorModel");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
		if (!token) {
			throw new Error("Authentication failed!");
		}
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userData = { userId: decodedToken.id };
		next();
	} catch (err) {
		const error = new HttpError("Authentication failed!", 401);
		return next(error);
	}
};
