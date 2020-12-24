const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const bcrypt = require("bcrypt");

const CreateUserSchema = require("../models/CreateUser");

//@desc Createaccount/
//@route
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.psw;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await CreateUserSchema.findOne({ email: email });
    if (user) {
      throw new Error("User with that email is already registered!");
    } else {
      const result = await CreateUserSchema.create({
        email: email,
        password: hashedPassword,
      });
      if (result) {
        res.redirect("/");
      }
    }
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

router.get("/", ensureGuest, (req, res) => {
  res.render("createaccount");
});

module.exports = router;
