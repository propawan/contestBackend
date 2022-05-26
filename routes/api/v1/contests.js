const express = require("express");
const router = express.Router();
const {
  createContest,
  registerInContest,
} = require("../../../controllers/contests");
const authenticationMiddleware = require("../../../middlewares/auth");

router.route("/").post(authenticationMiddleware, createContest);
router
  .route("/register/:contestId")
  .post(authenticationMiddleware, registerInContest);

module.exports = router;
