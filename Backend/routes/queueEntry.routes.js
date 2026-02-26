const router = require("express").Router();
const protect = require("../middlewares/auth");
const requireRole = require("../middlewares/role");
const c = require("../controllers/queueEntry.controller");

// customer joins queue (public)
router.post("/join", c.joinQueue);

// staff views live queue
router.get("/:queueId/live", protect, requireRole("OWNER", "STAFF"), c.getQueueLive);

// staff serves next
router.post("/:queueId/serve-next", protect, requireRole("OWNER", "STAFF"), c.serveNext);

module.exports = router;