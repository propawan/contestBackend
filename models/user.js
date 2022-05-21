const mongoose = require("mongoose");
const validator = require("validator");
const { userTypes } = require("../utils/constants");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [30, "User Full name can't be greater than 30 characters."],
  },
  userName: {
    type: String,
    required: [true, "must provide username."],
    trim: true,
    maxlength: [20, "Username can't be greater than 20 characters."],
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
    type: String,
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
  userType: {
    type: String,
    required: true,
    enum: [userTypes.admin, userTypes.participant],
    default: userTypes.participant,
  },
});

module.exports = mongoose.model("User", UserSchema);
