const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  userName: {
    type: String,
    required: "Please provide a username",
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: "Please provide a password",
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
