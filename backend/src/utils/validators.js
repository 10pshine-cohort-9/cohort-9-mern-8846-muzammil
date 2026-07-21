const registerSchema = (data) => {
  const errors = [];

  if (!data.username || data.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  // these are the regex regular expression for vaidating the email address

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

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
