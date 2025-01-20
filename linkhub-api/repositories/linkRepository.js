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
  
    async deleteLink(linkId) {
      const link = await this.Link.findByPk(linkId);
      if (!link) return null;
  
      await link.destroy();
      return true;
    }
  }
  
  module.exports = LinkRepository;
  