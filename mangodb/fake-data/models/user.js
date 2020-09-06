const mongoose = require("mongoose");

// ======== SCHEMA ===
const userDataSchema = new mongoose.Schema({
  //  _id: false,  <no id auto generated>
  name: { type: String },
  city: String,
});

module.exports = mongoose.model("userDataCollection", userDataSchema);
