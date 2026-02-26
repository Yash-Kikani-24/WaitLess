const Queue = require("../models/Queue");

exports.createQueue = async (req, res, next) => {
  try {
    const { businessId, staffId, name, avgServiceTimeMinutes } = req.body;

    const queue = await Queue.create({
      businessId,
      staffId: staffId || req.auth.sub, // STAFF can create their own queue
      name,
      avgServiceTimeMinutes,
    });

    res.status(201).json(queue);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({ message: "Queue already exists for this staff" });
    }
    next(e);
  }
};

exports.getBusinessQueues = async (req, res, next) => {
  try {
    const queues = await Queue.find({ businessId: req.params.businessId })
      .populate("staffId", "name email");
    res.json(queues);
  } catch (e) {
    next(e);
  }
};