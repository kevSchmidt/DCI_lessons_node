const mongoose = require("mongoose");

// ===== Mongoose Schema ===
const employeesDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: String,
  employeeDate: {
    type: String,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("employeesData", employeesDataSchema);
