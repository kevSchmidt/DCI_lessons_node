const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// ======== Create New Json Token ===
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ======== Sign Up ===
exports.signup = catchAsync(async (req, res, next) => {
  // ---- create new user ----
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // ---- send json token ----
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// ======== Log In ===
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // ---- email && password exist ----
  if (!email || !password) {
    return next(new AppError('Please provide an email and a password', 400));
  }

  // ---- email && password is correct ----
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // ---- send token to client ----
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
