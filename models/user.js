const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "must provide username."],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "must provide email."],
    validate: [validator.isEmail, "invalid email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "must provide password."],
  },
  contact: {
    type: Number,
    required: [true, "must provide contact."],
    validate: [validator.isMobilePhone, "invalid contact."],
  },
  linkedinUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  yoe: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
