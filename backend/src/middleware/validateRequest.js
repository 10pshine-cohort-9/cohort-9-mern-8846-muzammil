const logger = require('../config/logger');

const validateRequest = (validator) => (req, res, next) => {
  const errors = validator(req.body);

  if (errors.length > 0) {
    logger.warn({ err: errors, path: req.path }, 'Validation failed');
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = validateRequest;
