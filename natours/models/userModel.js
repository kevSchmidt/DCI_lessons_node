const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// ======== User Schema ===
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please a name is required'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'], // validator package
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // hide password in database
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // only on SAVE and CREATE: compare password & confirmed password
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

// ======== Encrypt Password ===
userSchema.pre('save', async function (next) {
  // exit function if selected field is not modified
  if (!this.isModified('password')) return next();

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirmed password field in database
  this.passwordConfirm = undefined;
  next();
});

// ======== Compare Passwords ===
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
