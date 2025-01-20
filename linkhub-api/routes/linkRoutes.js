const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const linkController = require('../controllers/linkController');

module.exports = (linkService) => {
  const router = express.Router();
  router.use(authMiddleware);

  router.post('/', (req, res) => linkController.createLink(req, res, linkService));
  router.post('/bulk', (req, res) => linkController.createLinksInBulk(req, res, linkService));
  router.get('/', (req, res) => linkController.getUserLinks(req, res, linkService));

   // Novo endpoint para buscar link pelo ID
  router.get('/:id', (req, res) => linkController.getLinksByUsername(req, res, linkService));


  return router;
};
