const express = require("express");
let router = express.Router();

const contestRoutes = require("./v1/contests");
const scoreRoutes = require("./v1/score");
const userRoutes = require("./v1/users");

router.use("/v1/contests", contestRoutes);
router.use("/v1/scores", scoreRoutes);
router.use("/v1/users", userRoutes);

module.exports = router;
