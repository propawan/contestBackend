const User = require("../models/user");

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).json({ user });
};

module.exports = { createUser };
