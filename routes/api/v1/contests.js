const express = require("express");
const router = express.Router();
const { createContest } = require("../../../controllers/contests");
const authenticationMiddleware = require("../../../middlewares/auth");

router.route("/").post(authenticationMiddleware, createContest);

module.exports = router;
