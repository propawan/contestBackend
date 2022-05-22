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

module.exports = { createContest, getContestUsers };
