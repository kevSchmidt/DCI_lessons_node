const express = require("express");

const router = express.Router();

// ===== Books page root ===
router.get("/books", (req, res) => {
  res.send("Hey this is Books page.");
});

module.exports = router;
