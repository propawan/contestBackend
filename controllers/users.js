const bcrypt = require("bcryptjs");
const BadRequest = require("../errors/bad-request");
const { createCustomError } = require("../errors/custom-error");
const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  let password = req.body.password;
  if (!password) {
    throw createCustomError("Password is required", 400);
  }
  req.body.password = bcrypt.hashSync(password);
  const user = await User.create(req.body);
  return res.status(201).json({ user });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createCustomError(`No user with id ${userId}`, 404);
  }
  return res.status(200).json({ user });
};

const signIn = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw createCustomError("Please provide email and password", 400);
  }
  const user = await User.findOne({ userName: userName });
  if (!user) {
    throw new BadRequest(`No user exist with userName : ${userName}`);
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Password is incorrect");
  }
  const token = jwt.sign({ id: user._id, userName }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User signed in", token });
};

module.exports = { createUser, getUser, signIn };
