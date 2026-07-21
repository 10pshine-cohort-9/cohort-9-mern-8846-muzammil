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

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  logger.error({ err: err.message, stack: err.stack }, 'Server error');
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;