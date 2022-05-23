const Contest = require("../models/contest");
const createContest = async (req, res) => {
  console.log("Inside Contest");
  console.log(req.user);
  const contest = await Contest.create(req.body);
  return res.status(201).json({ contest });
};

module.exports = { createContest };
