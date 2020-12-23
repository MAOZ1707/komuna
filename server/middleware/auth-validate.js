const jwt = require("jsonwebtoken");
const HttpError = require("../models/errorModel");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Error("Authentication failed");
		}

		const decodedToken = jwt.verify(token, "secret_code_privet");
		console.log("decodedToken--- ", decodedToken);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		const error = new HttpError("Authentication failed", 401);
		return next(error);
	}
};
