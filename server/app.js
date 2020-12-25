const path = require("path");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routers/userRoutes");
const homeRouter = require("./routers/homeRouter");
const todosRouter = require("./routers/todosRouter");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// read images file
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// Route
app.use("/api/home", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/todos", todosRouter);

app.use("/", express.static(path.join(__dirname, "../client/build")));

// Error middleware

app.use((err, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}

	if (res.headerSent) {
		return next(err);
	}

	res.status(err.code || 500).json({ message: err.message || "Something get wrong ! " });
});

module.exports = app;
