const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRoutes");
const homeRouter = require("./routers/homeRouter");
const todosRouter = require("./routers/todosRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Route
app.use("/api/home", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/todos", todosRouter);

// Error middleware

app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}

	res.status(err.code || 500).json({ message: err.message || "Something get wrong ! " });
});

module.exports = app;
