require("dotenv").config();
require("express-async-errors");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");

app.use(express.json());
app.use("/api/v1/users", users);

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
