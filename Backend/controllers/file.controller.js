const cloudinary = require("../utils/cloudinary");
const File = require("../models/File");

exports.uploadToVisit = async (req, res, next) => {
  try {
    const { visitId } = req.params;
    const { fileType } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (err, uploadResult) => {
        if (err) return next(err);

        const file = await File.create({
          visitId,
          uploadedBy: req.auth.sub,
          fileUrl: uploadResult.secure_url,
          fileType,
          fileName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
        });

        res.status(201).json(file);
      }
    );

    result.end(req.file.buffer);
  } catch (e) {
    next(e);
  }
};