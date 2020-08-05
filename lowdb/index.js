const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const app = express();
const jsonFile = new FileSync("db.json");
const db = low(jsonFile);

// process json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// root req
app.get("/", (req, res) => {
  res.send("Welcome to lowdb");
});

// Init
app.get("/new", (req, res) => {
  db.defaults({ articles: [], user: {}, num: 1 }).write();
  res.send("New db being init");
});

// Add (url ==> /add?id=1&title=I+like+water)
app.get("/add", (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  db.get("articles").push({ id: id, title: title }).write();
  res.send(`New data being entered with id = ${id} and title = ${title}`);
});

// Find (url ==>  /find?id=1)
app.get("/find", (req, res) => {
  const idToFind = req.query.id;
  res.send(db.get("articles").find({ id: idToFind }).value());
});

// Update
app.get("/update", (req, res) => {
  db.update("num", (n) => n + 1).write();
  const num = db.get("num").value();
  res.send(`num was increased by one, now num is = ${num}`);
});

// User name (url ==> /user?name=Kevin)
app.get("/user", (req, res) => {
  const name = req.query.name;
  db.set("user.name", name).write();
  res.send(`Hey ${name} `);
});

/* ******* 
Post method (url: https://localhost:3000/login)
 {
    'userName': 'Kevin',
     'pass':'call0me0maybe'
 }
*/
app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const userPass = req.body.pass;
  if (userName === "Kevin" && userPass === call0me0maybe) {
    res.status(200).send(`Welcome ${userName}`);
  } else {
    res.status(401).send(`invalid username or password`);
  }
});

// Remove
app.get("/delete", async (req, res) => {
  // for article (url ==> /delete?title=something)
  const title = req.query.title;
  await db.get("articles").remove({ title: title }).write();
  res.status(200).send(`${title} has been removed`);

  //for a property (url ==> /delete)
  db.unset("user.name").write();
  res.status(200).send("user.name has been removed");
});

app.get("/api", (req, res) => {
  res.status(200).json({ id: 1, cityName: "Berlin", country: "DE" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listen on http://localhost:${PORT}`);
});
