const express = require("express");
const router = express.Router();
const {
  createContest,
  getContest,
  getAllContest,
} = require("../../../controllers/contests");

router.route("/").post(createContest).get(getAllContest);

router.route("/:id").get(getContest);

module.exports = router;
