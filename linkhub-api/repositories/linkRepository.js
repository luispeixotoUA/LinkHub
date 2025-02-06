class LinkRepository {
    constructor(LinkModel) {
      this.Link = LinkModel;
    }
  
    async createLink(linkData) {
      return this.Link.create(linkData);
    }

    async createLinksInBulk(links) {
        return this.Link.bulkCreate(links);
      }
  
    async findLinksByUserId(userId) {
      return this.Link.findAll({ where: { userId } });
    }

    async findLinkById(linkId) {
      return this.Link.findByPk(linkId);
    }    
  
    async updateLink(linkId, updatedData) {
      const link = await this.Link.findByPk(linkId);
      if (!link) return null;
  
      return link.update(updatedData);
    }

    async findLinksByUserId(userId) {
      return this.Link.findAll({ 
        where: { userId },
        order: [['order', 'ASC']]
      });
    }

    async findLinksByUsername(username) {
      return this.Link.findAll({
        include: [{
          model: require('../models/user'),
          where: { username },
          attributes: []
        }],
        order: [['order', 'ASC']]
      });
    }

    async reorderLinks(links) {
      const updates = links.map(({ id, order }) =>
        this.Link.update({ order }, { where: { id } })
      );
      return Promise.all(updates);
    }
  
    async deleteLink(linkId) {
      const link = await this.Link.findByPk(linkId);
      if (!link) return null;
  
      await link.destroy();
      return true;
    }
  }
  
  module.exports = LinkRepository;
  