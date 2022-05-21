const Score = require("../models/score");

const createScore = async (req, res) => {
  const score = await Score.create(req.body);
  return res.status(201).json({ score });
};

module.exports = { createScore };