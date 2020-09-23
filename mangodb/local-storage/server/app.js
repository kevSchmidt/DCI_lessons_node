const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const User = require("./models/userModel");

const app = express();

app.use(morgan("dev"));

// ---- MongoDB ----
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB is connected"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });

app.use(express.json());

// ---- Route ----
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = app;
