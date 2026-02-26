module.exports = (...allowed) => (req, res, next) => {
  if (!req.auth || !allowed.includes(req.auth.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};