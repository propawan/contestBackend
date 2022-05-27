const BadRequest = require("../errors/bad-request");
const Contest = require("../models/contest");
const Score = require("../models/score");
const createContest = async (req, res) => {
  const contest = await Contest.create(req.body);
  return res.status(201).json({ contest });
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
    userScores.push({ "Name": scores[i].userName, "Score" : scores[i].userScore });
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
    if(contests[i].contestDateAndTime>currentDate)
    {
      contestNames.push(contests[i].contestName);
    }
  }
  if (contestNames.length == 0) {
    return res.status(200).json({ message: "No Upcoming Contests" });
  }
  console.log(currentDate);
  return res.status(200).json({ contestNames });
};


module.exports = { createContest, registerInContest, getContestUsers, getUpcomingContests };
