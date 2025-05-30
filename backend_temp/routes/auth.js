const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");

// 🛡️ Token doğrulayıcı middleware
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

// 🔐 Kayıt
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (err) {
    console.error("Register hatası:", err);
    res.status(400).json({ error: "Kullanıcı adı zaten kullanılıyor" });
  }
});

// 🔑 Giriş
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ error: "Şifre yanlış" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Login hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// ⭐ Favori ekleme
router.post("/favorites", verifyToken, async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ error: "movieId gerekli" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.json({ message: "Favori eklendi", favorites: user.favorites });
  } catch (err) {
    console.error("Favori ekleme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// 📄 Favorileri listeleme
router.get("/favorites", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    res.json({ favorites: user.favorites });
  } catch (err) {
    console.error("Favorileri getirme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
