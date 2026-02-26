const QueueEntry = require("../models/QueueEntry");
const Visit = require("../models/Visit");
const Queue = require("../models/Queue");

// Customer joins queue (guest for now)
exports.joinQueue = async (req, res, next) => {
  try {
    const { queueId, customerName, phone } = req.body;

    const entry = await QueueEntry.create({
      queueId,
      customerName,
      phone,
    });

    res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
};

// Staff views current queue (WAITING only, dynamic positions)
exports.getQueueLive = async (req, res, next) => {
  try {
    const { queueId } = req.params;

    const waiting = await QueueEntry.find({ queueId, status: "WAITING" })
      .sort({ joinedAt: 1 })
      .lean();

    const withPositions = waiting.map((e, idx) => ({
      ...e,
      position: idx + 1,
    }));

    res.json({
      queueId,
      waitingCount: waiting.length,
      entries: withPositions,
    });
  } catch (e) {
    next(e);
  }
};

// Staff serves next
exports.serveNext = async (req, res, next) => {
  try {
    const { queueId } = req.params;

    const nextEntry = await QueueEntry.findOneAndUpdate(
      { queueId, status: "WAITING" },
      { status: "SERVED", servedAt: new Date() },
      { sort: { joinedAt: 1 }, new: true }
    );

    if (!nextEntry) {
      return res.status(404).json({ message: "No one waiting" });
    }

    const queue = await Queue.findById(queueId).lean();

    const visit = await Visit.create({
      customerName: nextEntry.customerName,
      phone: nextEntry.phone,
      businessId: queue.businessId,
      staffId: queue.staffId,
      queueId,
      startedAt: nextEntry.joinedAt,
      endedAt: new Date(),
    });

    res.json({ served: nextEntry, visit });
  } catch (e) {
    next(e);
  }
};