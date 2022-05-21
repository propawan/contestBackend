const mongoose = require("mongoose");
const ScoreSchema = new mongoose.Schema({
  contestName: {
    type: String,
    required: [true],
    trim: true,
    maxlength: [200, "contest name can't be more than 200 chars long"]
  },
  userName: {
    type: String,
    required: [true],
    trim: true,
    maxlength: [200, "user name can't be more than 200 chars long"]
  },
  userScore: {
    type: Number,
    default:0
  },
  correctQuestions: {
    type: Number,
    default:0
  }
});

module.exports = mongoose.model("Score", ScoreSchema);