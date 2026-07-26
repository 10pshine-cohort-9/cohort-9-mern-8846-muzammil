const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../utils/validators');

const router = express.Router();

/**
 * Register a new user account.
 */
router.post('/register', validateRequest(registerSchema), registerUser);

/**
 * Authenticate a user and issue tokens.
 */
router.post('/login', validateRequest(loginSchema), loginUser);

/**
 * Log out the authenticated user.
 */
router.post('/logout', protect, logoutUser);

/**
 * Retrieve the authenticated user's profile.
 */
router.get('/me', protect, getCurrentUser);

module.exports = router;