const express = require("express");
const router = express.Router();

// Example route handler
router.get("/", (req, res) => {
  res.render("quiz");
});

module.exports = router;
