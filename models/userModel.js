const express = require("express");

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address is already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
      minLength : 7,
    },
  },

  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
