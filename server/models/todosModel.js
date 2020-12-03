const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
	category: {
		type: String,
		required: [true, "selected category is require"],
	},
	title: {
		type: String,
		required: [true, "first name is required"],
		trim: true,
	},
	body: {
		type: String,
		required: [true, "selected category is require"],
		trim: true,
	},
	createAt: {
		type: Date,
	},
	creator: {
		type: String,
		required: true,
	},
});

const Todos = mongoose.model("Todos", todosSchema);

module.exports = Todos;
