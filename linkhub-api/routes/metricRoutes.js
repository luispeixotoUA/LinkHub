const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (metricService) => {
  const router = express.Router();

  router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
      const stats = await metricService.getDashboardStats(req.user.userId);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/activity', authMiddleware, async (req, res) => {
    try {
      const activity = await metricService.getRecentActivity(req.user.userId);
      res.json(activity);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/link/:id/click', async (req, res) => {
    try {
      const { id } = req.params;
      await metricService.trackLinkClick(id);
      res.status(200).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/profile/:username/view', async (req, res) => {
    try {
      console.log("Passa aqui")
      const { username } = req.params;
      await metricService.trackProfileView(username);
      res.status(200).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};