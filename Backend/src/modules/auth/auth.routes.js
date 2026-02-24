const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const { me } = require("./auth.me.controller");
const protect = require("../../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", protect, me);

module.exports = router;