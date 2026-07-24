require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./config/logger');

const PORT = process.env.PORT || 5000;

/**
 * Starts the server and initializes the database connection on startup.
 */
connectDB();

/**
 * Starts the HTTP server and logs the listening port.
 *
 * @param {number} port - The port number on which the server listens.
 * @returns {void}
 */
app.listen(PORT, () => logger.info(`Server is Running at Port ${PORT}`));