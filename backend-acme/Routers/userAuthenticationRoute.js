const express = require("express");
const {
  getusers,
  createUser,
  userSignin,
} = require("../Controllers/userAuthenticController");

const router = express.Router();

// get Users Table
router.get("/", getusers);
//register user
router.post("/register", createUser);

router.post("/signin", userSignin)

module.exports = router;