const bcrypt = require("bcryptjs");
const BadRequest = require("../errors/bad-request");
const { createCustomError } = require("../errors/custom-error");
const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../models/user");
const Score = require("../models/score");
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

const getUserContests = async (req, res) => {
  const { userName: reqUserName } = req.query;
  const user = await User.findOne({ userName: reqUserName });
  if (user == null) {
    throw createCustomError(`User name ${reqUserName} does not exist`, 404);
  }
  const scores = await Score.find({ userName: reqUserName });
  if (scores.length == 0) {
    return res.status(200).json({ message: "No Contests Registered yet." });
  }
  const contestNames = [];
  for (let i = 0; i < scores.length; i++) {
    contestNames.push(scores[i].contestName);
  }
  return res.status(200).json({ contestNames });
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
  const token = jwt.sign(
    { id: user._id, userName: user.userName, userType: user.userType },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.status(200).json({ msg: "User signed in", token });
};

const updateUserInfo = async (req, res) => {
  const { id: userId } = req.user;
  const user = await User.findOne({ _id: userId });
  user.email = req.body.email == undefined ? user.email : req.body.email;
  user.contact =
    req.body.contact == undefined ? user.contact : req.body.contact;
  user.linkedinUrl =
    req.body.linkedinUrl == undefined ? user.linkedinUrl : req.body.linkedinUrl;
  user.githubUrl =
    req.body.githubUrl == undefined ? user.githubUrl : req.body.githubUrl;
  user.yoe = req.body.yoe == undefined ? user.yoe : req.body.yoe;
  const updatedUser = await User.findOneAndUpdate({ _id: userId }, user, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({ updatedUser });
};

module.exports = {
  createUser,
  getUser,
  signIn,
  getUserContests,
  updateUserInfo,
};
