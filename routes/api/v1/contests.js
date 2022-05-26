const express = require("express");
const router = express.Router();
const {
  createContest,
  registerInContest,
  getContestUsers
} = require("../../../controllers/contests");
const authenticationMiddleware = require("../../../middlewares/auth");

router.route("/").post(authenticationMiddleware, createContest);
router
  .route("/register/:contestId")
  .post(authenticationMiddleware, registerInContest);
router.route("/:id").get(getContestUsers);

module.exports = router;
