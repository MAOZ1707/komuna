const mongoose = require("mongoose");
null;
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
	nickname: {
		type: String,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email  is required"],
		unique: true,
		trim: true,
	},
	age: {
		type: Number,
		required: [true, "Age  is required"],
		min: 0,
		max: 60,
	},
	isLogin: Boolean,
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
