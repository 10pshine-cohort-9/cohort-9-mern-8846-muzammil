const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * Send a simple welcome message from the API root route.
 * @param {import('express').Request} req - The incoming request object.
 * @param {import('express').Response} res - The response object used to send the reply.
 * @returns {void}
 */
app.get('/', (req, res) => {
    res.json({
        message: 'NOTE-APP'
    });
});

module.exports = app;