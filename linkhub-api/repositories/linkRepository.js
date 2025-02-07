const Link = require('../models/Link');

class LinkRepository {
  async createLink(linkData) {
    return await Link.create(linkData);
  }

  async createLinksInBulk(links) {
    return await Link.insertMany(links);
  }

  async findLinksByUserId(userId) {
    return await Link.find({ userId }).sort({ order: 1 });
  }

  async findLinkById(linkId) {
    return await Link.findById(linkId);
  }

  async updateLink(linkId, updatedData) {
    return await Link.findByIdAndUpdate(linkId, updatedData, { new: true });
  }

  async deleteLink(linkId) {
    return await Link.findByIdAndDelete(linkId);
  }

  async reorderLinks(links) {
    const bulkOperations = links.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { order } }
    }));
    return await Link.bulkWrite(bulkOperations);
  }
}

module.exports = LinkRepository;