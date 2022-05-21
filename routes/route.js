const express=require("express");
const demoControl=require("../controllers/demo");
const router=express.Router();
router.route("/").get(demoControl);

module.exports=router;