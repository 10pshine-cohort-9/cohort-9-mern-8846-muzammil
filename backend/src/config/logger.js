const pino = require('pino');

/**
 * Shared logger instance for backend request and error logging.
 */
const logger = pino({
    level: 'info'
});

module.exports = logger;