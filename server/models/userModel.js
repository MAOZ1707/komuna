const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		required: [true, "first name is required"],
		maxlength: [30, "A name must have a less or equal to 30 characters"],
		minlength: [3, "A name must have a more or equal to 3 characters"],
	},
	lastname: {
		type: String,
		trim: true,
		maxlength: [30, "A name must have a less or equal to 30 characters"],
		minlength: [3, "A name must have a more or equal to 3 characters"],
		required: [true, "last name is required"],
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "Please provide your email"],
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please provide your password"],
		minlength: [8, "Password must be more or equal to 8 characters"],
	},
	todos: [
		{
			type: mongoose.Types.ObjectId,
			required: true,
			ref: "Todos",
		},
	],
});

usersSchema.plugin(uniqueValidator);

// usersSchema.pre("save", async function (next) {
// 	if (!this.isModified) return next();

// 	this.password = await bcrypt.hash(this.password, 12);
// 	next();
// });

const User = mongoose.model("User", usersSchema);

module.exports = User;
