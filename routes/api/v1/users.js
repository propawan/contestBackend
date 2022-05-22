const express = require("express");
const { createUser, getUser, signIn } = require("../../../controllers/users");
const router = express.Router();

router.route("/").post(createUser);
router.route("/signin").post(signIn);
router.route("/:id").get(getUser);

module.exports = router;
