const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");
const UserSchema = require("../models/CreateUser");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://storybooks-app-ak.herokuapp.com/auth/google/callback",
        // callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  // passport.use(
  //   new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  //     // Match user
  //     User.findOne({
  //       email: email,
  //     }).then((user) => {
  //       if (!user) {
  //         return done(null, false, { message: "That email is not registered" });
  //       }

  //       // Match password
  //       bcrypt.compare(password, user.password, (err, isMatch) => {
  //         console.log("54", password);
  //         if (err) throw err;
  //         if (isMatch) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false, { message: "Password incorrect" });
  //         }
  //       });
  //     });
  //   })
  // );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
