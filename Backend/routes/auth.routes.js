const router = require("express").Router();
const c = require("../controllers/auth.controller");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/refresh", c.refresh);   // 👈 add this
router.post("/logout", c.logout);

module.exports = router;