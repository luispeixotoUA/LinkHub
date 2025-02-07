const Metric = require('../models/Metric');

class MetricRepository {
  async createMetric(data) {
    return await Metric.create(data);
  }

  async getTotalLinks(userId) {
    return await Metric.countDocuments({ userId });
  }

  async getDailyVisits(userId) {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return await Metric.countDocuments({ userId, type: 'PROFILE_VIEW', createdAt: { $gte: oneDayAgo } });
  }

  async getTotalClicks(userId) {
    return await Metric.countDocuments({ userId, type: 'LINK_CLICK' });
  }

  async getRecentActivity(userId, limit = 50) {
    return await Metric.find({ userId }).sort({ createdAt: -1 }).limit(limit);
  }

  async getClicksForLink(linkId) {
    return await Metric.countDocuments({ linkId, type: 'LINK_CLICK' });
  }
}

module.exports = MetricRepository;