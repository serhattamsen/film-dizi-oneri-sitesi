const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");


// 🛡️ Token doğrulama middleware'i
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token gerekli" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Token doğrulama hatası:", err);
    res.status(403).json({ error: "Geçersiz token" });
  }
};


// ✅ Kayıt ol
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Kullanıcı adı zaten alınmış." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Kayıt başarılı!" });
  } catch (err) {
    console.error("Kayıt hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// ✅ Giriş yap
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Şifre yanlış." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Giriş hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// ✅ Giriş yapan kullanıcıyı getir
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token gerekli." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (err) {
    console.error("Token çözümleme hatası:", err);
    res.status(401).json({ error: "Geçersiz token" });
  }
});


// 🎯 Kullanıcının filme puan vermesi
router.post("/rate", verifyToken, async (req, res) => {
  const { movieId, score } = req.body;

  if (!movieId || typeof score !== "number") {
    return res.status(400).json({ error: "Eksik veri" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    // Aynı film için puan varsa güncelle, yoksa ekle
    const existing = user.ratings.find(r => r.movieId === movieId);
    if (existing) {
      existing.score = score;
    } else {
      user.ratings.push({ movieId, score });
    }

    await user.save();
    res.json({ message: "Puan kaydedildi", ratings: user.ratings });
  } catch (err) {
    console.error("Puan hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
