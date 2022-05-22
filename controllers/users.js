const { createCustomError } = require("../errors/custom-error");
const User = require("../models/user");
const Score = require("../models/score");
const Contest = require("../models/contest");

const createUser = async (req, res) => {
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

module.exports = { createUser, getUser, getUserContests };
