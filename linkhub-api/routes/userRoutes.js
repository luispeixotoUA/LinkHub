const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

module.exports = (userService, linkService) => {
  const router = express.Router();

  router.put('/profile', authMiddleware, (req, res) => userController.updateProfile(req, res, userService));

  router.get('/', authMiddleware, (req, res) => userController.getPrivateProfile(req, res, userService));

  router.get('/getAll', authMiddleware, (req, res) => userController.getAllUsers(req, res, userService) );

  router.get('/:url', (req, res) => userController.getPublicProfile(req, res, userService, linkService));

  return router;
};