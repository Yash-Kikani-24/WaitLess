const Business = require("../models/Business");

exports.createBusiness = async (req, res, next) => {
  try {
    const business = await Business.create({
      ...req.body,
      ownerId: req.auth.sub, // never trust client for ownerId
    });
    res.status(201).json(business);
  } catch (e) {
    next(e);
  }
};

exports.myBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find({ ownerId: req.auth.sub }).sort({ createdAt: -1 });
    res.json(businesses);
  } catch (e) {
    next(e);
  }
};