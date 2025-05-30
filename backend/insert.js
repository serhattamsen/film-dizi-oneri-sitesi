const mongoose = require("mongoose");
const Film = require("./models/film");

//const uri = "mongodb+srv://testuser:test12345@film-dizi-db.q0jbytq.mongodb.net/filmDB?retryWrites=true&w=majority&appName=film-dizi-db";
const uri = "mongodb+srv://filmuser:film12345@film-dizi-db.q0jbytq.mongodb.net/filmDB?retryWrites=true&w=majority&appName=film-dizi-db";

mongoose.connect(uri)
.then(async () => {
  console.log("✅ MongoDB'ye bağlandı.");

  const yeniFilmler = [
    {
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      genre: ["Sci-Fi", "Thriller"],
      year: 2010,
      posterUrl: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
    },
    {
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      genre: ["Crime", "Drama"],
      year: 1972,
      posterUrl: "https://image.tmdb.org/t/p/w500/iVZ3JAcAjmguGPnRNfWFOtLHOuY.jpg"
    },
    {
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
      genre: ["Sci-Fi", "Adventure"],
      year: 2014,
      posterUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
    }
  ];

  await Film.insertMany(yeniFilmler);
  console.log("🎉 Veriler başarıyla eklendi.");

  mongoose.disconnect();
})
.catch(err => console.error("❌ Hata:", err));
