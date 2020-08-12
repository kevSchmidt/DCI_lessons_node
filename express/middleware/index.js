const express = require("express");

const app = express();

app.use(logger);

app.get("/", (req, res) => {
  console.log(`Loading Home...`);
  res.send(`This is Home Page.`);
});

app.get("/about", userLogged, (req, res) => {
  console.log(`Loading About...`);
  res.send(`This is About Page. Welcome ${req.userName}!`);
});

function logger(req, res, next) {
  console.log("function logger is executed");
  next();
}

function userLogged(req, res, next) {
  if (req.query.name === "Kevin") {
    req.userName = "Kevin";
    next();
  } else {
    res.send("Login or Register");
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listen on http://localhost:${PORT}`);
});
