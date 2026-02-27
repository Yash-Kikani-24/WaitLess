const Customer = require("../models/Customer");
const { hashPassword, comparePassword } = require("../utils/password");
const { signAccess, signRefresh } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;

    const exists = await Customer.findOne({ phone });
    if (exists) return res.status(409).json({ message: "Phone already exists" });

    const passwordHash = await hashPassword(password);

    const customer = await Customer.create({ name, phone, passwordHash });

    res.status(201).json({ id: customer._id, name: customer.name });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const customer = await Customer.findOne({ phone });

    if (!customer) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await comparePassword(password, customer.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccess({ sub: customer._id, role: "CUSTOMER" });
    const refreshToken = signRefresh({ sub: customer._id });

    res
      .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "lax" })
      .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax" })
      .json({ message: "Customer logged in" });
  } catch (e) {
    next(e);
  }
};