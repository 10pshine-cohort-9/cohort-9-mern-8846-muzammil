const jwt = require('jsonwebtoken');

/**
 * Generate a short-lived JWT access token for an authenticated user.
 *
 * @param {string} userId - MongoDB user identifier.
 * @returns {string} Signed access token.
 */
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

/**
 * Generate a longer-lived JWT refresh token for an authenticated user.
 *
 * @param {string} userId - MongoDB user identifier.
 * @returns {string} Signed refresh token.
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || `${process.env.JWT_SECRET}-refresh`, { expiresIn: '7d' });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};