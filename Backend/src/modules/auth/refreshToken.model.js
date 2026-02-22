const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "subjectType",
    },
    subjectType: {
      type: String,
      required: true,
      enum: ["User", "Customer"],
    },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    userAgent: { type: String },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);