const express = require("express");
const router = express.Router();
const {
  createContest,
  getContest,
  getAllContest,
  getAllParticipants,
  getOnGoingContest,
  deleteContest,
  updateContest,
  registerInContest,
  getContestUsers,
  getUpcomingContests,
} = require("../../../controllers/contests");

router.route("/onGoingContest").get(getOnGoingContest);
router.route("/").post(createContest).get(getAllContest);

router.route("/:id").get(getContest);

router.route("/:id/participants").get(getAllParticipants);

router.route("/:id").delete(deleteContest);

router.route("/").put(updateContest);
const authenticationMiddleware = require("../../../middlewares/auth");

router.route("/").post(authenticationMiddleware, createContest);
router
  .route("/register/:contestId")
  .post(authenticationMiddleware, registerInContest);
router.route("/:id").get(getContestUsers);
router.route("/features/upComingContests").get(getUpcomingContests);

module.exports = router;
