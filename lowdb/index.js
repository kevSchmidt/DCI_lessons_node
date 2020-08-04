const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const port = 3000;
const jsonFile = new FileSync("db.json");
const db = low(jsonFile);

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
Post method (url: https://website.com/login)
 {
    'email': 'my@mail.co',
     'pass':'000callme000'
 }
*/
app.post("/login", (req, res) => {
  const userName = req.body.email;
  const userPass = req.body.pass;
});

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
