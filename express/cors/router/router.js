const express = require("express");

const router = express.Router();

// ===== Home page route ===
router.get("/", (req, res) => {
  res.send("Hey this is Home page.");
});

// ===== About page route ===
router.get("/about", (req, res) => {
  res.send("Hey this is About page.");
});

module.exports = router;
