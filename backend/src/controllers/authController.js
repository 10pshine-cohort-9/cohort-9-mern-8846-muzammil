const { registerUser: register, loginUser: login, logoutUser: logout, getCurrentUserProfile, } = require('../services/authService');

/**
 * Register a new user account and respond with the generated tokens.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const registerUser = async (req, res, next) => {
    try {
        const result = await register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        res.status(201).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

/**
 * Authenticate a user and return the issued access and refresh tokens.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const loginUser = async (req, res, next) => {
    try {
        const result = await login({
            email: req.body.email,
            password: req.body.password,
        });

        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

/**
 * Log out the current user and return a success response.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const logoutUser = async (req, res, next) => {
    try {
        const result = await logout(req.user?._id);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

/**
 * Return the authenticated user's profile information.
 *
 * @param {import('express').Request} req - HTTP request.
 * @param {import('express').Response} res - HTTP response.
 * @param {import('express').NextFunction} next - Express next callback.
 * @returns {Promise<void>}
 */
const getCurrentUser = async (req, res, next) => {
    try {
        const result = await getCurrentUserProfile(req.user);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
};
