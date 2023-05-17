
const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// @desc User Register Successfully
// @route POST /api/users/register
// @access public
const userRegister = expressAsyncHandler(async (req, res) => {
  
  const {username, email, password} = req.body;
  // console.log(username, email, password);

  // check is any field is not empty.
  if(!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  };

  // check is password length greater than 7.
  if(password.length < 8) {
    res.status(400);
    throw new Error("Password must be atleast 8 characters long");
  };

  // check is this user is not already stored.
  const isUserAlreadyStored = await userModel.findOne({email});
  if(isUserAlreadyStored) {
    res.status(400);
    throw new Error("User already registered");
  }

  // firstly encryption is done to secure the password.
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password is : ", hashedPassword);

  // stored the user into database.
  let createdUser = await userModel.create({
    username,
    email,
    password : hashedPassword
  });
  // console.log(`User created ${createdUser}`);
  if(createdUser) {
    res.status(201);
    res.json({
      message: "User Register Successfully",
      createdUser : {
        id : createdUser._id,
        username : createdUser.username,
        email : createdUser.email
      },
    })
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc User loggedIn Successfully
// @route POST /api/users/login
// @access public
const userLogin = expressAsyncHandler(async (req, res) => {
  res.json({
    message: "User loggedIn Successfully",
  });
});

// @desc Current User information
// @route GET /api/users/current
// @access private (only logged In users can get the user information)
const currentUser = expressAsyncHandler(async (req, res) => {
  res.json({
    message: "Current User information",
  });
});

module.exports = { userRegister, userLogin, currentUser };
