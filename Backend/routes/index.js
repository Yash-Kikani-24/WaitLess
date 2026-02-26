const router = require("express").Router();
const authRoutes = require("./auth.routes");
const businessRoutes = require("./business.routes");
const staffRoutes = require("./staff.routes");
const queueRoutes = require("./queue.routes");
const queueEntryRoutes = require("./queueEntry.routes");
const fileRoutes = require("./file.routes");
const protect = require("../middlewares/auth");

router.use("/auth", authRoutes);
router.use("/businesses", businessRoutes);
router.use("/staff", staffRoutes);
router.use("/queues", queueRoutes);
router.use("/queue-entries", queueEntryRoutes);
router.use("/files", fileRoutes);

router.get("/me", protect, (req, res) => res.json({ me: req.auth }));

module.exports = router;