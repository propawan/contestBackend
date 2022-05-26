const BadRequest = require("../errors/bad-request");
const Contest = require("../models/contest");
const createContest = async (req, res) => {
  const contest = await Contest.create(req.body);
  return res.status(201).json({ contest });
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

module.exports = { createContest, registerInContest };
