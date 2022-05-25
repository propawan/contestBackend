const { createCustomError } = require("../errors/custom-error");
const contest = require("../models/contest");
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
  let today = new Date();
  let todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const contests = await Contest.find({});

  let onGoingContest = contests.filter((cn) => {
    let contestTimestamp = cn.contestDateAndTime.getTime();
    return (
      contestTimestamp >= todayDate.getTime() + 19800000 &&
      contestTimestamp <= today.getTime() + 19800000
    );
  });

  return res.json({ onGoingContest });
};

const deleteContest = async (req, res) => {
  const id = req.params.id;

  let contest = await Contest.find({ _id: id });

  if (contest == null || contest.length == 0) {
    return res.status(404).json({ message: "Cannot find Contest" });
  }

  await Contest.deleteOne({ _id: id });

  let score = await Score.find({ contestId: contest._id });

  score.map(async function (v, i) {
    //if (v.contestId == id) {
    await Score.deleteOne(v._id);
    // }
  });

  return res.status(200).json({ message: "Contest has been deleted" });
};

const updateContest = async (req, res) => {
  const contest = req.body;
  let updatedContest = await Contest.findByIdAndUpdate(contest._id, contest);

  let score = await Score.find({ contestId: contest._id });

  score.map(async function (v, i) {
    v.contestName = contest.contestName;
    await Score.findByIdAndUpdate(v._id, v);
  });

  return res.status(200).json({ updateContest });
};

module.exports = {
  createContest,
  getContest,
  getAllContest,
  getAllParticipants,
  getOnGoingContest,
  deleteContest,
  updateContest,
};
