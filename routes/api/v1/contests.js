const express = require("express");
const router = express.Router();
const {
  createContest,
  getContestUsers,
} = require("../../../controllers/contests");

router.route("/").post(createContest);
router.route("/:id").get(getContestUsers);

module.exports = router;
