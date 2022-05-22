const express = require("express");
const {
  createUser,
  getUser,
  getUserContests,
} = require("../../../controllers/users");
const router = express.Router();

router.route("/").post(createUser);
router.route("/:id").get(getUser);
router.route("/").get(getUserContests);

module.exports = router;
