const { createCustomError } = require("../errors/custom-error");
const Contest = require("../models/contest");
const Score = require("../models/score");

const createContest = async (req, res) => {
  const contest = await Contest.create(req.body);
  return res.status(201).json({ contest });
};

const getContest = async (req, res) => {
  const id = req.params.id;
  let contest = await Contest.find({ _id: id });

  if (contest == null || contest.length == 0) {
    return res.status(404).json({ message: "Cannot find Contest" });
  }

  return res.status(200).json({ contest });
};

const getAllContest = async (req, res) => {
  const contests = await Contest.find({});
  return res.json({ contests });
};

const getAllParticipants = async (req, res) => {
  const id = req.params.id;

  let contest = await Contest.find({ _id: id });
  if (contest == null || contest.length == 0) {
    return res.status(404).json({ message: "Cannot find Contest" });
  }

  let score = await Score.find({ contestId: contest._id });

  let allParticipant = score.map(function (sc, i) {
    return sc.userName;
  });

  return res
    .status(200)
    .json({ allParticipant, totalParticipants: allParticipant.length });
};

const getOnGoingContest = async (req, res) => {
  const contests = await Contest.find({});
  let today = new Date();
  console.log(today);
  console.log(today.getTime());
  let onGoingContest = contests.filter(function (cn, i) {
    return cn.contestDateAndTime.getTime() === today.getTime();
  });

  return res.json({ onGoingContest });
};

module.exports = {
  createContest,
  getContest,
  getAllContest,
  getAllParticipants,
  getOnGoingContest,
};
