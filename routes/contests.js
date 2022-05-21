const express=require("express");
const demoFunction=require("../controllers/contests");
const router =express.Router();

router.route("/:id").get(demoFunction);

module.exports=router;