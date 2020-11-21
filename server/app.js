const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routers/userRoutes");
const homeRouter = require("./routers/homeRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Route
app.use("/api/home", homeRouter);
app.use("/api/users", userRouter);

module.exports = app;
