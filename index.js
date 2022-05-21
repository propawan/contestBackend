require("dotenv").config();
require("express-async-errors");

const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes/api/index");
const app = express();
const notFoundMiddleWare = require("./middlewares/not-found");
const errorMiddleWare = require("./middlewares/error-handler");

app.use(express.json());
app.use("/api", router);

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
