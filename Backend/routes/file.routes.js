const router = require("express").Router();
const protect = require("../middlewares/auth");
const requireRole = require("../middlewares/role");
const upload = require("../middlewares/upload");
const c = require("../controllers/file.controller");

router.post(
  "/visits/:visitId/files",
  protect,
  requireRole("OWNER", "STAFF"),
  upload.single("file"),
  c.uploadToVisit
);

module.exports = router;