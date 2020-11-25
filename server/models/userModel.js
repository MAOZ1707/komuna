const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		required: [true, "first name is required"],
	},
	lastname: {
		type: String,
		trim: true,
		required: [true, "last name is required"],
	},
	age: {
		type: Number,
		required: [true, "age is required"],
	},
	gender: {
		type: String,
		trim: true,
		required: [true, "gender is required"],
	},
	islogin: {
		type: Boolean,
	},
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
