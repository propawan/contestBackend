const { createCustomError } = require("../errors/custom-error");
const Contest = require("../models/contest");
const createContest = async (req, res) => {
  const contest = await Contest.create(req.body);
  return res.status(201).json({ contest });
};

const getContest = async (req, res) => {
  const id = req.params.id;
  let contest;
  try {
    contest = await Contest.findById(id);
    if (contest == null) {
      return res.status(404).json({ message: "Cannot find Contest" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(200).json({ contest });
};

const getAllContest = async (req, res) => {
  try {
    const contests = Contest.find();
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContest, getContest, getAllContest };
