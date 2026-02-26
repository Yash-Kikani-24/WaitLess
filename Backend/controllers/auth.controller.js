const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/password");
const { signAccess, signRefresh } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role });

    res.status(201).json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccess({ sub: user._id, role: user.role });
    const refreshToken = signRefresh({ sub: user._id });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true in prod (https)
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true in prod
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Logged in" });
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Logged out" });
};

exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const { verifyRefresh, signAccess } = require("../utils/jwt");
    const payload = verifyRefresh(refreshToken);

    const newAccessToken = signAccess({ sub: payload.sub, role: payload.role });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in prod
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  } catch (e) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};