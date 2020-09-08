const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const bookControllers = require("./controllers/bookControllers");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// ======== Process the json data ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// ======== MongoDB ===
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });

//  ======== Routes ===
app.get("/", bookControllers.getAll).post("/", bookControllers.addAuthor);
app.get("/book", bookControllers.getAllBooks);
app
  .get("/:id", bookControllers.getOneByID)
  .post("/:id", bookControllers.addBook)
  .delete("/:id", bookControllers.deleteOneByID);

module.exports = app;
