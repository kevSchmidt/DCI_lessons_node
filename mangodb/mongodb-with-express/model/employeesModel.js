const mongoose = require("mongoose");

// ===== Schema ===
const employeesDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `You have to enter a name.`],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, `You have to enter an age.`],
  },
  address: String,
  employeeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// ===== Create new collection ===
// module.exports = mongoose.model("employeesData", employeesDataSchema);

// ===== Specify a collection already existing ===
module.exports = mongoose.model(
  "employeesData",
  employeesDataSchema,
  "employeesData"
);
