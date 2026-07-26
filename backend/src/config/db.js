const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Connect the application to MongoDB using the configured environment URI.
 *
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;