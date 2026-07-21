const { registerUser: register, loginUser: login, logoutUser: logout, getCurrentUserProfile, } = require('../services/authService');

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

const logoutUser = async (req, res, next) => {
    try {
        const result = await logout(req.user?._id);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

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
