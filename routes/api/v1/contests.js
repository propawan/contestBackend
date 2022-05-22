const express = require("express");
const router = express.Router();
const { createContest } = require("../../../controllers/contests");

router.route("/").post(createContest);

router.route("/:id").get();

module.exports = router;
