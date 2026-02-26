const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    visitId: { type: mongoose.Schema.Types.ObjectId, ref: "Visit", required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, enum: ["invoice", "prescription", "report", "other"], required: true },
    fileName: { type: String },
    mimeType: { type: String },
    size: { type: Number },
  },
  { timestamps: true }
);

fileSchema.index({ visitId: 1, createdAt: -1 });

module.exports = mongoose.model("File", fileSchema);