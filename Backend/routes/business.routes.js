const router = require("express").Router();
const protect = require("../middlewares/auth");
const requireRole = require("../middlewares/role");
const c = require("../controllers/business.controller");

router.post("/", protect, requireRole("OWNER"), c.createBusiness);
router.get("/mine", protect, requireRole("OWNER"), c.myBusinesses);

module.exports = router;