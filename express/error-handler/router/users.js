const express = require("express");

const router = express.Router();

// ===== Users page root ===
router.get("/users", (req, res) => {
  res.send("Hey this is Users Page");
});

module.exports = router;
