const express = require("express");
const userRouter = express.Router();

const {
  userRegister,
  userLogin,
  currentUser,
} = require("../controllers/userController");

userRouter
    .route("/register")
    .post(userRegister);

userRouter
    .route("/login")
    .post(userLogin);

userRouter
    .route("/current")
    .get(currentUser);

module.exports = userRouter;
