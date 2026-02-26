const { verifyAccess } = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verifyAccess(token);
    req.auth = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};