class LinkService {
  constructor(linkRepository) {
    this.linkRepository = linkRepository;
  }

  async createLink(userId, title, url) {
    return this.linkRepository.createLink({ userId, title, url });
  }

  async createLinksInBulk(userId, links) {
    const linksWithUserId = links.map((link) => ({
      ...link,
      userId,
    }));
    return this.linkRepository.createLinksInBulk(linksWithUserId);
  }

  async getUserLinks(userId) {
    return this.linkRepository.findLinksByUserId(userId);
  }

  async updateLink(userId, linkId, updatedData) {
    const link = await this.linkRepository.updateLink(linkId, updatedData);
    if (!link || link.userId !== userId) {
      throw new Error('Unauthorized or Link not found');
    }
    return link;
  }

  async deleteLink(userId, linkId) {
    const link = await this.linkRepository.deleteLink(linkId);
    if (!link) {
      throw new Error('Link not found');
    }
    return true;
  }

}

module.exports = LinkService;
