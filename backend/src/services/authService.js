const bcrypt = require('bcrypt');
const User = require('../models/User');
const logger = require('../config/logger');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn({ email }, 'Registration failed: email already exists');
    throw createError('User with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  logger.info({ userId: user._id, email: user.email }, 'User registration');

  return {
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn({ email }, 'Failed login: user not found');
    throw createError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    logger.warn({ email }, 'Failed login: invalid password');
    throw createError('Invalid email or password', 401);
  }

  logger.info({ userId: user._id, email: user.email }, 'Successful login');

  return {
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    },
  };
};

const logoutUser = async (userId) => {
  logger.info({ userId }, 'User logout');
  return { message: 'Logout successful' };
};

const getCurrentUserProfile = async (user) => {
  return { user };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
};
