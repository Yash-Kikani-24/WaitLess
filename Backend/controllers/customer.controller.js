const Visit = require("../models/Visit");
const File = require("../models/File");

exports.getMyVisits = async (req, res, next) => {
  try {
    const visits = await Visit.find({ customerId: req.auth.sub })
      .populate("businessId", "name address")
      .sort({ createdAt: -1 });

    res.json(visits);
  } catch (e) {
    next(e);
  }
};

exports.getVisitFiles = async (req, res, next) => {
  try {
    const files = await File.find({ visitId: req.params.visitId });
    res.json(files);
  } catch (e) {
    next(e);
  }
};