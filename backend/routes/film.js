const express = require("express");
const router = express.Router();
const Film = require("../models/film");

// Film ekle
router.post("/add", async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json({ message: "Film eklendi" });
  } catch (err) {
    console.error("Film ekleme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Tüm filmleri getir
router.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


module.exports = router;