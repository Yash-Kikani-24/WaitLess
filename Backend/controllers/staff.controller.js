const User = require("../models/User");
const { hashPassword } = require("../utils/password");

exports.createStaff = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const passwordHash = await hashPassword(password);

    const staff = await User.create({
      name,
      email,
      passwordHash,
      role: "STAFF",
    });

    res.status(201).json({ id: staff._id, name: staff.name, email: staff.email });
  } catch (e) {
    next(e);
  }
};