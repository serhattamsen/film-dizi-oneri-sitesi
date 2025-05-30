const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel"); // DOĞRU MODEL

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(); // DOĞRU KOLEKSİYON
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
