const express = require("express");
const { createScore } = require("../controllers/score");
const router = express.Router();

router.route("/").post(createScore);

module.exports = router;
