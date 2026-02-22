const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);