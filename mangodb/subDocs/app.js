const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const bookControllers = require("./controllers/bookControllers");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// ======== process json data ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// ======== mongodb ===
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });

// ======== routes ===
app
  .get("/", bookControllers.getAllAuthors)
  .post("/", bookControllers.addOneAuthor);

app
  .get("/:id", bookControllers.getOneAuthor)
  .delete("/:id", bookControllers.deleteOneAuthor);

module.exports = app;
