const metricController = (metricService) => ({
  getDashboardStats: async (req, res) => {
    try {
      const stats = await metricService.getDashboardStats(req.user.id);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getRecentActivity: async (req, res) => {
    try {
      const activity = await metricService.getRecentActivity(req.user.id);
      res.json(activity);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  trackLinkClick: async (req, res) => {
    try {
      await metricService.trackLinkClick(req.params.id);
      res.status(200).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  trackProfileView: async (req, res) => {
    try {
      console.log("passa aqui")
      await metricService.trackProfileView(req.params.username);
      res.status(200).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = metricController;