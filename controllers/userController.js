
const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const {email, password} = req.body;

  // check if email or password is not empty
  if(!email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  // check this user is present in database and compare the entered password with db password.
  // if both are true then sent a response with an accessToken.
  const loggedInUser = await userModel.findOne({email});
  // console.log(loggedInUser);
  if(loggedInUser && (await bcrypt.compare(password, loggedInUser.password))) {
    
    // now lets generate an accessToken.
    let accessToken = jwt.sign({
      user : {
        username : loggedInUser.username,
        email : loggedInUser.email,
        id : loggedInUser._id,
      },
    }, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn : "1m"});
    
    //Now we will sent this generated accessToken in response. 
    res.status(200);
    res.json({accessToken});

  } else {
    
    res.status(401);
    throw new Error("Email or password is not valid");
    
  }
});

// @desc Current User information
// @route GET /api/users/current
// @access private (only logged In users can get the user information)
const currentUser = expressAsyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { userRegister, userLogin, currentUser };
