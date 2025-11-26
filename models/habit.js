const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  frequency: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Habit", habitSchema);
