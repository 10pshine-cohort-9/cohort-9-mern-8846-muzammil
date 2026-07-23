require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./config/logger');

const PORT = process.env.PORT || 5000;

connectDB();

/**
 * Start the backend server and log the port it is listening on.
 * @returns {void}
 */
app.listen(PORT, () => logger.info(`Server is Running at Port ${PORT}`));