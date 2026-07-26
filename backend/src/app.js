const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/auth', authRoutes);

/**
 * Respond with a 404 payload for unknown routes.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @returns {void}
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};

/**
 * Forward unexpected errors to the response layer with a consistent payload.
 *
 * @param {Error & { statusCode?: number }} err - Error object.
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  logger.error({ err: err.message, stack: err.stack }, 'Server error');
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;