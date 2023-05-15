
const expressAsyncHandler = require("express-async-handler");

// @desc User Register Successfully
// @route POST /api/users/register
// @access public
const userRegister = expressAsyncHandler(async (req, res) => {
  res.json({
    message: "User Register Successfully",
  });
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
