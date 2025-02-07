const User = require('../models/User');

class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async createUser(userData) {
    return await this.User.create(userData);
  }

  async findByUsername(username) {
    console.log("Entrou no repository");
    return this.User.findOne({ username });
  }

  async findByUrl(url) {
    return await this.User.findOne({ url });
  }

  async findById(userId) {
    return await this.User.findById(userId);
  }

  async getAllUsers() {
    return await this.User.find().select('-password -theme');
  }
}

module.exports = UserRepository;