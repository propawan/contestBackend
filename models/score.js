const mongoose = require("mongoose");
const ScoreSchema = new mongoose.Schema({
  contestName: {
    type: String,
    required: [true, "must provide a existing contest name"],
    trim: true,
    maxlength: [200, "contest name can't be more than 200 chars long"]
  },
  userName: {
    type: String,
    required: [true, "must provide a existing user name"],
    trim: true,
    maxlength: [200, "user name can't be more than 200 chars long"]
  },
  usescoreName: {
    type: Number,
    default:0
  },
  correctQuestions: {
    type: Number,
    default:0
  }
});

module.exports = mongoose.model("Score", ScoreSchema);