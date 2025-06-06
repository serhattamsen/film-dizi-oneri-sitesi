const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: [String],
  year: Number,
  posterUrl: String
});

module.exports = mongoose.model("Film", filmSchema);
