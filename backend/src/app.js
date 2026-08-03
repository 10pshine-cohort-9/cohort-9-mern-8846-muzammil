const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const logger = require('./config/logger');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  logger.error({ err: err.message, stack: err.stack }, 'Server error');

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500 ? 'Internal server error' : (err.message || 'Request failed');

  res.status(statusCode).json({
    success: false,
    message,
  });
});

module.exports = app;