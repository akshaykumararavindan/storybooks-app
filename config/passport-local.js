const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const UserSchema = require("../models/CreateUser");

module.exports = new LocalStrategy({ usernameField: "email" }, function (
  email,
  password,
  done
) {
  UserSchema.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (bcrypt.compare(password, password)) {
      return done(null, false);
    }
    return done(null, user);
  });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserSchema.findById(id, (err, user) => done(err, user));
});
