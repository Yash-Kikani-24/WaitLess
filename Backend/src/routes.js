const express = require("express");
const router = express.Router();
const authRoutes = require("./modules/auth/auth.routes");

router.get("/", (req, res) => {
  res.json({ message: "WaitLess API is live 🚀" });
});
router.use("/auth", authRoutes);

module.exports = router;