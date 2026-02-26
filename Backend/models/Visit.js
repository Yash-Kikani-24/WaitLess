const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    queueId: { type: mongoose.Schema.Types.ObjectId, ref: "Queue", required: true },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

visitSchema.index({ businessId: 1, staffId: 1, createdAt: -1 });

module.exports = mongoose.model("Visit", visitSchema);