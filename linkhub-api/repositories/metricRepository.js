const { Op } = require('sequelize');

class MetricRepository {
 constructor(MetricModel, LinkModel) {
   this.Metric = MetricModel;
   this.Link = LinkModel;
 }

 async createMetric(data) {
   try {
     return await this.Metric.create(data);
   } catch (error) {
     throw new Error(`Error creating metric: ${error.message}`);
   }
 }

 async getTotalLinks(userId) {
   try {
     return await this.Link.count({ where: { userId } });
   } catch (error) {
     throw new Error(`Error counting links: ${error.message}`);
   }
 }

 async getDailyVisits(userId) {
   try {
     const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
     return await this.Metric.count({
       where: {
         userId,
         type: 'PROFILE_VIEW',
         createdAt: { [Op.gte]: oneDayAgo }
       }
     });
   } catch (error) {
     throw new Error(`Error counting daily visits: ${error.message}`);
   }
 }

 async getTotalClicks(userId) {
   try {
     return await this.Metric.count({
       where: { 
         userId,
         type: 'LINK_CLICK'
       }
     });
   } catch (error) {
     throw new Error(`Error counting clicks: ${error.message}`);
   }
 }

// MetricRepository
async getRecentActivity(userId, limit = 50) {
  try {
    const activities = await this.Metric.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit,
      include: [{
        model: this.Link,
        as: 'link',
        attributes: ['title', 'url'],
        required: false
      }]
    });
 
    return activities.map(activity => {
      const base = {
        id: activity.id,
        type: activity.type,
        timestamp: activity.createdAt,
        description: activity.type === 'LINK_CLICK' && activity.link
          ? `Link: ${activity.link.title}`
          : 'Profile view',
        timeAgo: formatTimeAgo(activity.createdAt)
      };
 
      if (activity.type === 'LINK_CLICK' && activity.link) {
        base.details = {
          title: activity.link.title,
          url: activity.link.url
        };
      }
 
      return base;
    });
  } catch (error) {
    throw new Error(`Error getting recent activity: ${error.message}`);
  }
 }

 async getClicksForLink(linkId) {
   try {
     return await this.Metric.count({
       where: {
         linkId,
         type: 'LINK_CLICK'
       }
     });
   } catch (error) {
     throw new Error(`Error counting link clicks: ${error.message}`);
   }
 }

 async getLastClickForLink(linkId) {
   try {
     return await this.Metric.findOne({
       where: {
         linkId,
         type: 'LINK_CLICK'
       },
       order: [['createdAt', 'DESC']]
     });
   } catch (error) {
     throw new Error(`Error getting last click: ${error.message}`);
   }
 }
}



function formatTimeAgo(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  
  const intervals = {
    ano: 31536000,
    mês: 2592000,
    dia: 86400,
    hora: 3600,
    minuto: 60
  };
 
  for (let [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `há ${interval} ${unit}${interval !== 1 ? 's' : ''}`;
    }
  }
  
  return 'agora mesmo';
 }



module.exports = MetricRepository;