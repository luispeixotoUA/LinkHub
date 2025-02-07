class LinkService {
  constructor(linkRepository) {
    this.linkRepository = linkRepository;
  }

  async createLink(userId, title, url) {
    return this.linkRepository.createLink({ userId, title, url });
  }

  async getUserLinks(userId) {
    return this.linkRepository.findLinksByUserId(userId);
  }

  async getLinkById(linkId) {
    return this.linkRepository.findLinkById(linkId);
  }

  async updateLink(userId, linkId, updatedData) {
    const link = await this.linkRepository.findLinkById(linkId);
    if (!link || link.userId.toString() !== userId) {
      throw new Error('Unauthorized or Link not found');
    }
    return this.linkRepository.updateLink(linkId, updatedData);
  }

  async deleteLink(userId, linkId) {
    console.log('Service deleteLink:', { userId, linkId });
    const link = await this.linkRepository.findLinkById(linkId);

    if (!link || link.userId.toString() !== userId) {
      throw new Error('Unauthorized or Link not found');
    }

    const result = await this.linkRepository.deleteLink(linkId);
    console.log('Delete result:', result);
    return result;
  }

  async reorderLinks(userId, linkOrders) {
    return this.linkRepository.reorderLinks(linkOrders);
  }
}

module.exports = LinkService;