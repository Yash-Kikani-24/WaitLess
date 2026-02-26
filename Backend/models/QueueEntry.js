const mongoose = require("mongoose");

const queueEntrySchema = new mongoose.Schema(
  {
    queueId: { type: mongoose.Schema.Types.ObjectId, ref: "Queue", required: true },
    customerName: { type: String, required: true },
    phone: { type: String },
    status: { type: String, enum: ["WAITING", "SERVED", "CANCELLED"], default: "WAITING" },
    joinedAt: { type: Date, default: Date.now },
    servedAt: { type: Date },
  },
  { timestamps: true }
);

queueEntrySchema.index({ queueId: 1, status: 1, joinedAt: 1 });

module.exports = mongoose.model("QueueEntry", queueEntrySchema);