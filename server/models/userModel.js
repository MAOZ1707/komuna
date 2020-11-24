const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, "First name is required"],
		trim: true,
	},
	lastname: {
		type: String,
		required: [true, "Last name is required"],
		trim: true,
	},
	gender: {
		type: String,
		required: [true, "Gender is required"],
		trim: true,
	},
	age: {
		type: Number,
		required: [true, "Age  is required"],
	},
	islogin: {
		type: Boolean,
	},
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
