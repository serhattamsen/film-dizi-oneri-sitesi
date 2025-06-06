const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preference: {
    romance: { type: Number, default: 0 },
    action: { type: Number, default: 0 },
    adventure: { type: Number, default: 0 },
    horror: { type: Number, default: 0 },
    thriller: { type: Number, default: 0 },
    sciFi: { type: Number, default: 0 },
    imdb: { type: Number, default: 0 }
  },
  // ⬇️ Bunu buraya EKLE ⬇️
  ratings: [
    {
      movieId: { type: String, required: true },
      score: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
