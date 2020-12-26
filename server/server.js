// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cors = require("cors");
const app = require("./app");
dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(cors({ origin: true, credentials: true }));

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");

	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

let dbUrl = process.env.DATABASE_LOCAL;

if (process.env.DB_URL) {
	dbUrl = process.env.DB_URL;
}

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log(chalk.green.bold("DB connection successful!!"));
	})
	.catch((err) => console.log(err, chalk.red.bold("DB connection failed!!")));

console.log(process.env.PORT);
// server
const port = process.env.PORT || 9000;
app.listen(port, () => {
	console.log(chalk.magentaBright("App running !!"));
});
