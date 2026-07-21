const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../utils/validators');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.post('/logout', protect, logoutUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;