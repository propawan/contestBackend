const { createCustomError } = require("../errors/custom-error");
const User = require("../models/user");

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).json({ user });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createCustomError(`No user with id ${userId}`, 404);
  }
  return res.status(200).json({ user });
};

module.exports = { createUser, getUser };
