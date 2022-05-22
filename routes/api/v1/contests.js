const express = require("express");
const router = express.Router();
const {
  createContest,
  getContest,
  getAllContest,
  getAllParticipants,
  getOnGoingContest,
} = require("../../../controllers/contests");

router.route("/").post(createContest).get(getAllContest);

router.route("/:id").get(getContest);

router.route("/:id/participants").get(getAllParticipants);
router.route("/onGoingContest").get(getOnGoingContest);

module.exports = router;
