const mongoose = require("mongoose");

const CreateUserSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("CreateUser", CreateUserSchema);

module.exports = User;
