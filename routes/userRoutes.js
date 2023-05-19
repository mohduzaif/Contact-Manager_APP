const express = require("express");
const userRouter = express.Router();

const {
  userRegister,
  userLogin,
  currentUser,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

userRouter
    .route("/register")
    .post(userRegister);

userRouter
    .route("/login")
    .post(userLogin);

userRouter
    .route("/current")
    .get(validateToken, currentUser);

module.exports = userRouter;
