const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("userLogin");
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard",
  })(req, res, next);
});

module.exports = router;
