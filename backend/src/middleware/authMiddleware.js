const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn({ path: req.path }, 'Unauthorized access: missing bearer token');
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      logger.warn({ userId: decoded.id }, 'Unauthorized access: user not found');
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.warn({ err: error.message, path: req.path }, 'Unauthorized access');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = protect;
