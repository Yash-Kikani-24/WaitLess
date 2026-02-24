exports.me = async (req, res) => {
  res.json({ auth: req.auth });
};