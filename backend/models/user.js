const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [String] // TMDB ID'leri olabilir
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
