const { createCustomError } = require("../errors/custom-error");
const Contest = require("../models/contest");
const Score = require("../models/score");

const BadRequest = require("../errors/bad-request");
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
const getContestUsers = async (req, res) => {
  const { id: reqContestId } = req.params;
  const scores = await Score.find({ contestId: reqContestId });
  if (scores == null || scores.length == 0) {
    return res
      .status(200)
      .json({ message: `No users under this contest id:- ${reqContestId}` });
  }
  const userScores = [];
  for (let i = 0; i < scores.length; i++) {
    userScores.push({ Name: scores[i].userName, Score: scores[i].userScore });
  }
  return res.status(200).json({ userScores });
};

const registerInContest = async (req, res) => {
  const { id: userId } = req.user;
  const { contestId } = req.params;
  const contest = await Contest.findOne({ _id: contestId });
  if (contest == null || userId == null) {
    throw new BadRequest("Please provide correct contest id and userId.");
  }
  if (contest.users && contest.users.includes(userId)) {
    throw new BadRequest("User already registered.");
  }
  contest.users.push(userId);
  const updatedContest = await Contest.findOneAndUpdate(
    { _id: contestId },
    contest,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({ updatedContest });
};

const getUpcomingContests = async (req, res) => {
  const contests = await Contest.find({});
  const contestNames = [];
  let currentDate = new Date();
  for (let i = 0; i < contests.length; i++) {
    if (
      contests[i].contestDateAndTime.getTime() >
      currentDate.getTime() + 19800000
    ) {
      contestNames.push(contests[i].contestName);
    }
  }
  if (contestNames.length == 0) {
    return res.status(200).json({ message: "No Upcoming Contests" });
  }
  return res.status(200).json({ contestNames });
};

module.exports = {
  createContest,
  getContest,
  getAllContest,
  getAllParticipants,
  getOnGoingContest,
  deleteContest,
  updateContest,
  registerInContest,
  getContestUsers,
  getUpcomingContests,
};
