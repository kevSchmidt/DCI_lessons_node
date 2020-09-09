const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const userControllers = require("./controllers/userControllers");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// ======== Process json data ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// ======== MongoDB ===
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

// ======== Routes ===
app
  .get("/users", userControllers.getAllUsers)
  .post("/users", userControllers.addUser);

app.post("/login", userControllers.login);

module.exports = app;
