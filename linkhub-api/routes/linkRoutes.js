const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const linkController = require('../controllers/linkController');

module.exports = (linkService) => {
  const router = express.Router();
  router.use(authMiddleware);

  router.post('/', (req, res) => linkController.createLink(req, res, linkService));
  router.post('/bulk', (req, res) => linkController.createLinksInBulk(req, res, linkService));
  router.get('/', (req, res) => linkController.getUserLinks(req, res, linkService));
  router.get('/user/:username', (req, res) => linkController.getLinksByUsername(req, res, linkService));
  router.get('/:id', (req, res) => linkController.getLinkById(req, res, linkService));
  router.put('/:id', (req, res) => linkController.updateLink(req, res, linkService));
  router.delete('/:id', (req, res) => linkController.deleteLink(req, res, linkService));
  router.patch('/reorder', (req, res) => linkController.reorderLinks(req, res, linkService));

  return router;
};