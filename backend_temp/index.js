require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🌐 MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

// 🔗 Route'lar
const authRoutes = require("./routes/auth");
const filmRoutes = require("./routes/filmRoutes"); // dikkat: route adıyla eşleşmeli

app.use("/api", authRoutes);
app.use("/api/films", filmRoutes);

// 🏁 Ana endpoint
app.get("/", (req, res) => {
  res.send("✅ Backend çalışıyor!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Sunucu port ${PORT} üzerinde çalışıyor`));
