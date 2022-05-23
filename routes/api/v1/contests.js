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
} = require("../../../controllers/contests");

router.route("/onGoingContest").get(getOnGoingContest);
router.route("/").post(createContest).get(getAllContest);

router.route("/:id").get(getContest);

router.route("/:id/participants").get(getAllParticipants);

router.route("/:id").delete(deleteContest);

router.route("/").put(updateContest);

module.exports = router;
