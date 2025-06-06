const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Movie = require("./models/movieModel");
require("dotenv").config();

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

// JSON dosyasını oku
const filePath = path.join(__dirname, "movies_deduplicated.json");
const movieData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
console.log("Veri sayısı:", movieData.length);

// Film adlarındaki sayıları sil
const cleanedMovies = movieData.map(movie => ({
  ...movie,
  name: movie.name.replace(/\s\d+$/, "")
}));

// Veritabanına kaydet
Movie.insertMany(cleanedMovies)
  .then(() => {
    console.log("✅ Filmler başarıyla eklendi!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Film ekleme hatası:", err);
    mongoose.disconnect();
  });
