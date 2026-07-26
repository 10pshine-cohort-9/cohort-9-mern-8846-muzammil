const logger = require('../config/logger');

/**
 * Create a middleware that validates request bodies with the supplied schema function.
 *
 * @param {(data: object) => string[]} validator - Validation function returning an array of errors.
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void} Middleware.
 */
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
