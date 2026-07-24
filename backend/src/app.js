const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

/**
 * Creates and exposes the Express application used by the backend.
 */
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * Returns a simple status payload for the API root route.
 *
 * @param {import("express").Request} req - The incoming request object.
 * @param {import("express").Response} res - The outgoing response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
    res.json({
        message: 'NOTE-APP'
    });
});

/**
 * Exports the configured Express application.
 */
module.exports = app;