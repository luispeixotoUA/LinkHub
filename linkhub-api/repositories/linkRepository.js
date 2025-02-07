const Link = require('../models/Link');

class LinkRepository {
  constructor(Link) {
    this.Link = Link;
  }

  async createLink(linkData) {
    return await this.Link.create(linkData);
  }

  async createLinksInBulk(links) {
    return await this.Link.insertMany(links);
  }

  async findLinksByUserId(userId) {
    return await this.Link.find({ userId }).sort({ order: 1 });
  }

  async findLinkById(linkId) {
    return await this.Link.findById(linkId);
  }

  async updateLink(linkId, updatedData) {
    console.log('Update link:', linkId, updatedData);
    return await this.Link.findByIdAndUpdate(
      linkId,
      { $set: updatedData },
      { new: true }
    );
  }

  async deleteLink(linkId) {
    console.log('Delete link:', linkId);
    const result = await this.Link.findByIdAndDelete(linkId);
    console.log('Delete result:', result);
    return result;
  }

  async reorderLinks(links) {
    const operations = links.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } }
      }
    }));

    return await this.Link.bulkWrite(operations);
  }
}

module.exports = LinkRepository;