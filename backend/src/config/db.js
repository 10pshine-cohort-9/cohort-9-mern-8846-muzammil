const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Connects the application to MongoDB using the configured URI.
 *
 * @returns {Promise<void>} A promise that resolves once the database connection is established.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Exports the database connection helper.
 */
module.exports = connectDB;