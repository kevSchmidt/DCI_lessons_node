const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressValidation = require("express-validator");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const users = require("./routes/users");

const app = express();

app.use(morgan("dev"));

// ======== hbs ===
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);

// ======== process json data ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidation());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.raw());

// ======== mongoDB ===
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

app.use(
  expressSession({
    secret: "somethingSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// ======== routes ===
app.use("/", auth);
app.use("/users", users);

module.exports = app;
