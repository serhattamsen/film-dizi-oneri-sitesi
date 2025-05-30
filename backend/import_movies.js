const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Movie = require("./models/movieModel");
require("dotenv").config(); // .env dosyasını yükle

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB bağlantısı başarılı"))
.catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// JSON dosyasını oku
const filePath = path.join(__dirname, "movies_with_posters.json");
const moviesData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
console.log("Veri sayısı:", moviesData.length); // 👉 EKLE

// Veritabanına kaydet
Movie.insertMany(moviesData)
  .then(() => {
    console.log("🎬 Filmler başarıyla eklendi!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Film ekleme hatası:", err);
    mongoose.disconnect();
  });

