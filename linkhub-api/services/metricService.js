const { Op } = require('sequelize');

class MetricService {
  constructor(metricRepository, userRepository, linkRepository) {
    this.metricRepository = metricRepository;
    this.userRepository = userRepository;
    this.linkRepository = linkRepository;
  }

  async getDashboardStats(userId) {
    try {
      const [totalLinks, dailyVisits, totalClicks] = await Promise.all([
        this.metricRepository.getTotalLinks(userId),
        this.metricRepository.getDailyVisits(userId),
        this.metricRepository.getTotalClicks(userId)
      ]);

      return {
        totalLinks: totalLinks || 0,
        dailyVisits: dailyVisits || 0,
        activeLinks: totalLinks || 0,
        totalClicks: totalClicks || 0
      };
    } catch (error) {
      throw new Error(`Error getting dashboard stats: ${error.message}`);
    }
  }

  async getRecentActivity(userId) {
    try {
      const activity = await this.metricRepository.getRecentActivity(userId);
      return activity || [];
    } catch (error) {
      throw new Error(`Error getting recent activity: ${error.message}`);
    }
  }

  async trackLinkClick(linkId) {
    const link = await this.linkRepository.findLinkById(linkId);
    if (!link) throw new Error('Link not found');

    return this.metricRepository.createMetric({
      type: 'LINK_CLICK',
      linkId,
      userId: link.userId,
    });
  }

  async trackProfileView(username) {
    try {
      if (!username) throw new Error('Username is required');

      const user = await this.userRepository.findByUsername(username);
      if (!user) throw new Error('User not found');

      return await this.metricRepository.createMetric({
        type: 'PROFILE_VIEW',
        userId: user.id,
        timestamp: new Date(),
        metadata: { timestamp: new Date() }
      });
    } catch (error) {
      throw new Error(`Error tracking profile view: ${error.message}`);
    }
  }

  async getLinkStats(linkId) {
    try {
      const clicks = await this.metricRepository.getClicksForLink(linkId);
      return {
        totalClicks: clicks,
        lastClick: await this.metricRepository.getLastClickForLink(linkId)
      };
    } catch (error) {
      throw new Error(`Error getting link stats: ${error.message}`);
    }
  }
}

module.exports = MetricService;