const pino=require('pino');

/**
 * Creates the shared logger instance used throughout the backend.
 */
const logger=pino({
    level:"info"
});

/**
 * Exports the configured logger instance.
 */
module.exports=logger;