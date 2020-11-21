const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = require("./app");

app.use(cors());

const DB = process.env.DATABASE;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("DB connection successful!!");
	});

// server
const port = process.env.PORT || 9000;
app.listen(port, () => {
	console.log("App running !!");
});
