const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
	city: {
		type: String,
		required: [true, "City is required"],
		trim: true,
	},
	street: {
		type: String,
		required: [true, "Street is required"],
		trim: true,
	},
	houseNumber: {
		type: Number,
		required: [true, "City is required"],
		trim: true,
	},
	zipCode: {
		type: Number,
		required: [true, "Zip code is required"],
		trim: true,
	},
	isHomeAdded: {
		type: Boolean,
	},
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
