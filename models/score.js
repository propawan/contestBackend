const mongoose = require("mongoose");
const ScoreSchema = new mongoose.Schema({
  contestName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "contest name can't be more than 50 chars long"],
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "user name can't be more than 20 chars long"],
  },
  userScore: {
    type: Number,
    default: 0,
  },
  correctQuestions: {
    type: Number,
    default: 0,
  },
  contestId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "Please provide contest id."],
  },
});

module.exports = mongoose.model("Score", ScoreSchema);
