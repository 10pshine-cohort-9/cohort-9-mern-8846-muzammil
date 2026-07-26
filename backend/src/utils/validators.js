/**
 * Validate registration input for username, email, and password requirements.
 *
 * @param {object} data - Request payload.
 * @returns {string[]} List of validation errors.
 */
const registerSchema = (data) => {
  const errors = [];

  if (!data.username || data.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

/**
 * Validate login input for email and password requirements.
 *
 * @param {object} data - Request payload.
 * @returns {string[]} List of validation errors.
 */
const loginSchema = (data) => {
  const errors = [];

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

module.exports = {
  registerSchema,
  loginSchema,
};
