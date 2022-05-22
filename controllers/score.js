const Score = require("../models/score");
const User = require("../models/user");
const Contest = require("../models/contest");
const { createCustomError } = require("../errors/custom-error");

const createScore = async (req, res) => {
  const {contestId : reqContestId}=req.body;
  const {contestName : reqContestName}=req.body;
  const ContestObject = await Contest.findOne({ _id : reqContestId });
  if (ContestObject==null) {
    throw createCustomError(`No contest name ${reqContestName} exists`, 404);
  }

  const {userName : reqUserName}=req.body;
  const UserObject = await User.findOne({ userName : reqUserName });
  if (UserObject==null) {
    throw createCustomError(`No user name ${reqUserName} exists`, 404);
  }

  const ScoreObject = await Score.findOne({userName:reqUserName,contestId:reqContestId});
  if(ScoreObject!=null)
  {
    throw createCustomError(`User name:- ${reqUserName} is already registered under the Contest Name:- ${reqContestName}`, 404);
  }
  const score = await Score.create(req.body);
  return res.status(201).json({ score });
};

module.exports = { createScore };