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
    // validator package
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    // custom validator
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
  if (!this.isModified('password')) return next(); // exit function if selected field is not modified

  this.password = await bcrypt.hash(this.password, 12); // hash password with salt
  this.passwordConfirm = undefined; // hide confirmed password in database
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
