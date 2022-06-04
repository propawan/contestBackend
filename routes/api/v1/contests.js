const express = require("express");
const router = express.Router();
const {
  createContest,
  registerInContest,
  getContestUsers,
  getUpcomingContests,
  getRegisteredUsers,
  getContest,
  getOnGoingContest,
  updateContest,
} = require("../../../controllers/contests");
const authenticationMiddleware = require("../../../middlewares/auth");

router
  .route("/")
  .post(authenticationMiddleware, createContest)
  .put(authenticationMiddleware, updateContest);
router.route("/upComingContests").get(getUpcomingContests);
router.route("/onGoingContests").get(getOnGoingContest);
router
  .route("/register/:contestId")
  .post(authenticationMiddleware, registerInContest);
router.route("/:id").get(getContest);
router.route("/:id/userScores").get(getContestUsers);
router.route("/:id/registeredUsers").get(getRegisteredUsers);

module.exports = router;
