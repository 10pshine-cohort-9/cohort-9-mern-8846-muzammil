const logger = require('../config/logger');

/**
 * Create a middleware that validates request bodies with the supplied schema function.
 *
 * @param {(data: object) => string[]} validator - Validation function returning an array of errors.
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void} Middleware.
 */
const validateRequest = (schema) => (req, res, next) => {
  if (!schema || typeof schema.safeParse !== 'function') {
    const error = new Error('Server misconfiguration: invalid validation schema');
    error.statusCode = 500;
    return next(error);
  }

  const target = req.method === 'GET' || req.method === 'DELETE' ? req.params : req.body;
  const result = schema.safeParse(target);

  if (!result.success) {
    const errors = result.error.errors.map((e) => ({ path: e.path.join('.'), message: e.message }));
    logger.warn({ err: errors, path: req.path }, 'Validation failed');
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  // attach parsed data for downstream handlers
  if (req.method === 'GET' || req.method === 'DELETE') {
    req.params = result.data;
  } else {
    req.body = result.data;
  }

  next();
};

module.exports = validateRequest;
