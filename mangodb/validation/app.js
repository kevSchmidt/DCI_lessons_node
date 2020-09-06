// npm install express-validator@5.3.1
// npm install express-handlebars express-session cookie-parser body-parser

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const expressValidation = require("express-validator");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();
const path = require("path");

app.use(morgan("dev"));

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

// ======== PROCESS JSON DATA ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidation());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(
  expressSession({
    secret: "somethingSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// ======== VALIDATION ===
app.get("/", (req, res) => {
  res.render("index", {
    title: "Validation",
    done: false,
    errors: req.session.errors,
  });
  req.session.errors = null;
});

app.post("/submit", (req, res) => {
  req.check("email", "Invalid Email").isEmail();
  // isMobilePhone
  // isEmail()
  // isPostalCode
  // isCurrency
  // isCreditCard

  req
    .check("password", "Invalid Password")
    .isLength({ min: 6 })
    .equals(req.body.confPassword);

  const errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.done = false;
  } else {
    req.session.done = true;
  }
  res.redirect("/");
});

module.exports = app;
