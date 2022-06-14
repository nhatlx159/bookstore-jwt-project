const authController = require('../controllers/authController');

const route = require('express').Router();

// REGISTER 
route.post("/register", authController.registerUser)
// LOGIN
route.post("/login", authController.loginUser)
// REFRESH TOKEN
route.post("/refresh", authController.requestRefreshToken)
// LOGOUT
route.post("/logout", authController.logoutUser)

module.exports = route
