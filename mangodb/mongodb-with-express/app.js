const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const employeesRoute = require("./router/employeesRoute");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

// ===== Process json data ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// ===== MongoDB ===
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`DB is connected!`))
  .catch((error) => {
    console.log(`There was a problem: ${error.message}`);
  });

// ===== Routes ===
app.use("/employees", employeesRoute);

module.exports = app;
