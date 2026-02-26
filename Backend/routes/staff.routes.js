const router = require("express").Router();
const protect = require("../middlewares/auth");
const requireRole = require("../middlewares/role");
const c = require("../controllers/staff.controller");

router.post("/", protect, requireRole("OWNER"), c.createStaff);

module.exports = router;