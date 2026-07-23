const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Connect the app to MongoDB using the configured environment URI.
 * If the connection fails, the error is logged and the process exits.
 * @returns {Promise<void>} Resolves when the database connection is successful.
 * @throws {Error} If MongoDB connection fails.
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

module.exports = connectDB;