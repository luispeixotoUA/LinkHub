const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

module.exports = (userService, linkService) => {
  const router = express.Router();

  // Rota protegida: Atualizar perfil
  router.put('/profile', authMiddleware, (req, res) => userController.updateProfile(req, res, userService));

  // Rota pública: Obter perfil público
  router.get('/:url', (req, res) => userController.getPublicProfile(req, res, userService, linkService));

  return router;
};