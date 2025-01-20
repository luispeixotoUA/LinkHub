const express = require('express');
const authController = require('../controllers/authController');

module.exports = (authService, userService) => {
  const router = express.Router();

  router.post('/register', (req, res) => authController.register(req, res, userService, authService));
  router.post('/login', (req, res) => authController.login(req, res, authService));

  return router;
};
