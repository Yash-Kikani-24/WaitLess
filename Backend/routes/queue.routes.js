const router = require("express").Router();
const protect = require("../middlewares/auth");
const requireRole = require("../middlewares/role");
const c = require("../controllers/queue.controller");

router.post("/", protect, requireRole("OWNER", "STAFF"), c.createQueue);
router.get("/business/:businessId", protect, c.getBusinessQueues);

module.exports = router;