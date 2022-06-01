const express = require("express");
const {
  createUser,
  getUser,
  signIn,
  getUserContests,
  updateUserInfo
} = require("../../../controllers/users");
const authenticationMiddleware = require("../../../middlewares/auth");
const router = express.Router();

router.route("/").post(createUser);
router.route("/signin").post(signIn);
router.route("/:id").get(getUser);
router.route("/").get(getUserContests);
router.route("/updateUser").put(authenticationMiddleware,updateUserInfo);

module.exports = router;
