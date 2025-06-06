const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [Object], // ✅ Film objeleri için Object
  preference: {
    romance: { type: Number, default: 0 },
    action: { type: Number, default: 0 },
    adventure: { type: Number, default: 0 },
    horror: { type: Number, default: 0 },
    thriller: { type: Number, default: 0 },
    sciFi: { type: Number, default: 0 },
    imdb: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("User", UserSchema);
