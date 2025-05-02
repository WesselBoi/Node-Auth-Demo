const express = require("express");
const { handleSignUp, handleSignIn, handleLogout , handleGetUserProfile } = require("../controllers/user");
const {restrictToLoggedInUserOnly} = require("../middlewares/auth")

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/logout", handleLogout);
router.get("/profile" , restrictToLoggedInUserOnly, handleGetUserProfile)

module.exports = router