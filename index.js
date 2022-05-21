require("dotenv").config();
require("express-async-errors");

const mongoose = require("mongoose");
const express = require("express");
const contestRouter = require("./routes/contests");
const app = express();
const users = require("./routes/users");
const score = require("./routes/score");
const notFoundMiddleWare = require("./middlewares/not-found");
const errorMiddleWare = require("./middlewares/error-handler");

app.use(express.json());
app.use("/api/v1/contests", contestRouter);
app.use("/api/v1/users", users);
app.use("/api/v1/score", score);

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
