// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const mongoose = require("mongoose");
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
		console.log(chalk.green.bold("DB connection successful!!"));
	})
	.catch((err) => console.log(err, chalk.red.bold("DB connection failed!!")));

// server
const port = process.env.PORT || 9000;
app.listen(port, () => {
	console.log("App running !!");
});
