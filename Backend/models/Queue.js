const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    avgServiceTimeMinutes: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

queueSchema.index({ businessId: 1, staffId: 1 }, { unique: true }); // one queue per staff per business

module.exports = mongoose.model("Queue", queueSchema);