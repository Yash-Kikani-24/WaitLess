const User = require("../users/user.model");
const Customer = require("../customers/customer.model");
const RefreshToken = require("./refreshToken.model");
const { hashPassword, comparePassword } = require("../../utils/password");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../../utils/jwt");
const crypto = require("crypto");

const registerUser = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const passwordHash = await hashPassword(password);
  return User.create({ name, email, passwordHash, role });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = signAccessToken({ sub: user._id, type: "USER", role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id, type: "USER" });

  await RefreshToken.create({
    subjectId: user._id,
    subjectType: "User",
    tokenHash: crypto.createHash("sha256").update(refreshToken).digest("hex"),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user, accessToken, refreshToken };
};

module.exports = { registerUser, loginUser };