const express = require("express");
const router = express.Router();
const { createContest } = require("../controllers/contests");

router.route("/").post(createContest);

module.exports = router;
