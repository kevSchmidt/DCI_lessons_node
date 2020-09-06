const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userModel = require("./models/user");

const app = express();

app.use(morgan("dev"));

// ======== PROCESS JSON DATA ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected"))
  .catch((err) => {
    console.log(`There was error ${err.message}`);
  });

// ======== GET USER ===
app.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======== ADD USER ===
app.post("/", async (req, res) => {
  const user = new userModel({
    name: req.body.name,
    city: req.body.city,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======== GET USER BY ID ===
app.get("/:id", async (req, res) => {
  try {
    const userById = await userModel.findById({ _id: req.params.id });
    res.status(200).json(userById);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======== UPDATE USER BY ID ===
app.patch("/:id", async (req, res) => {
  try {
    const userById = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        city: req.body.city,
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    res.status(200).json(userById);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// ======== DELETE USER BY ID ===
app.delete("/:id", async (req, res) => {
  try {
    const deleteUserById = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteUserById);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
