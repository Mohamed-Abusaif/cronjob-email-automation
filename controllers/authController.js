const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AdminUser = require("./../models/AdminModel");

exports.login = async (req, res, next) => {
  const { username, password, role } = req.body;

  //1) Check if email and password exist
  if (!username || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide username and password and role!",
    });
  }
  //2) Check if user exist and password is correct
  let user = undefined;

  user = await AdminUser.findOne({ username: username }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect username or password",
    });
  }

  //3) If everything is ok, Send the token to client
  //creating the token:
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  //1) Getting token and check if it's there (exists)
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: "fail",
      message:
        "Your are not logged in! or You are not allowed to access this Route! Please login with your correct role to get access!",
    });
  }

  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  let currentUser = undefined;

  const admin = await AdminUser.findById(decoded.id);
  if (admin) {
    currentUser = admin;
  }
  if (!currentUser) {
    res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist!",
    });
  }

  //next() Grant Access To Protected Route
  req.user = currentUser;
  next();
};
