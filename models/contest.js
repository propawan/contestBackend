const mongoose = require("mongoose");
const ContestSchema = new mongoose.Schema({
  contestName: {
    type: String,
    required: [true, "must provide Contest Name"],
    trim: true,
    maxlength: [50, "Contest Name can't be more than 50 chars long"],
  },
  companyName: {
    type: String,
    required: [true, "must provide Company Name"],
    trim: true,
    maxlength: [30, "Company Name can't be more than 30 chars long"],
  },
  requiredExperience: {
    type: Number,
    required: [true, "must provide Required Experience"],
  },
  totalQuestion: {
    type: Number,
    required: [true, "must provide Total Question"],
  },
  profileDescription: {
    type: String,
    required: [true, "must provide Profile Description"],
    trim: true,
    maxlength: [200, "Profile Description can't be more than 200 chars long"],
  },
  contestDateAndTime: {
    type: Date,
    required: [true, "must provide Contest Date And Time"],
  },
  users: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
});

module.exports = mongoose.model("Contest", ContestSchema);
