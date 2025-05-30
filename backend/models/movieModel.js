const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  photo: String,
  imdb: Number,
  romance: Number,
  action: Number,
  adventure: Number,
  horror: Number,
  thriller: Number,
  sciFi: Number
});

module.exports = mongoose.model("Movie", movieSchema);
