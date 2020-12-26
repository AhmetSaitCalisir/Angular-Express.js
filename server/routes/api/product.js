const express = require("express");

const router = express.Router();

let dataBase = [{ id: 0, title: "Deneme" }]; // Denemek için veritabanı

router.get("/", (req, res) => {
  res.json(dataBase);
});

module.exports = router;
