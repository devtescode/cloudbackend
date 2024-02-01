const express = require("express")
const router = express.Router()
const {userWelcome, signUpBtn, signInBtn, dashboard, getdashboardref, delectimage} = require("../Controllers/user.controllers")

// const Image = require('../models/Image'); // Assuming you have a model for images




router.get("/welcome", userWelcome)
router.post("/getsignup", signUpBtn)
router.post("/getsignin", signInBtn)
router.post("/getdashboard", dashboard)
router.get("/getdashboardref", getdashboardref)
router.delete("/deleteImage/:imageId", delectimage)


module.exports = router
