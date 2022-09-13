const express = require("express");
// const morgan = require("morgan");
const AppError = require("./utils/appError");
const newsRouter = require("./routes/newsRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use("/api/v1/news", newsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
