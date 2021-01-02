const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "uploads/images",
		allowedFormats: ["jpg", "jpeg", "png", "mp4", "mov"],
		type: "authenticated",
	},
});

const parser = multer({ storage: storage });
module.exports = parser;
