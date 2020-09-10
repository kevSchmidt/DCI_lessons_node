const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;

const User = require("../models/userModel");
const Session = require("../models/sessionModel");

const userControllers = {};

userControllers.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

userControllers.addUser = async (req, res) => {
  const userCheck = await User.findOne({ userName: req.body.userName });

  if (userCheck) {
    return res
      .status(400)
      .send("This name is already been used <br> <a href='/'>try again</a>");
  }

  req.check("userName", "Invalid username").isLength({ min: 3 });
  req
    .check("password", "Invalid Password")
    .isLength({ min: 3 })
    .equals(req.body.confPassword);

  const errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.done = false;
    res.redirect("/");
  } else {
    req.session.done = true;
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPassword);

      const newUser = await new User({
        _id: mongoose.Types.ObjectId(),
        userName: req.body.userName,
        password: hashedPassword,
      });
      newUser.save();
      res.status(201).send("new user add <br> <a href='/login'>login</a>");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
};

userControllers.login = async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  const user = await User.findOne({ userName });

  if (user == null) {
    return res
      .status(404)
      .send("Cannot find user <br> <a href='/login'>try again</a>");
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      let sessionId = uuid();
      res.cookie("session_id", sessionId, {
        expires: new Date(Date.now() + 900000), // cookie will expire after 15 min
      });

      let session = new Session({
        uuid: sessionId,
        user_id: user,
      });

      session.save();
      res.render("login", {
        title: `Welcome ${userName}`,
        done: true,
        errors: req.session.errors,
      });
      req.session.errors = null;
    } else {
      res.send("Not Allowed <br> <a href='/login'>try again</a>");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = userControllers;
