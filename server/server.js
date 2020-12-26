// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cors = require("cors");
const app = require("./app");
const { login } = require("./controllers/authController");
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

// let dbUrl = process.env.DATABASE;
let dbUrl =
	"mongodb+srv://mazuz:EvK2t93MBMhyPelg@cluster0.l2k7l.mongodb.net/home-care-app?retryWrites=true&w=majority";

if (process.env.DB_URL) {
	console.log("DataBase----"), process.env.DB_URL;
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
let port = 9000;
if (process.env.PORT) {
	port = process.env.PORT;
}

app.listen(port, () => {
	console.log(chalk.magentaBright("App running !!"));
});
