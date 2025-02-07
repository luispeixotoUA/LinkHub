class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async createUser(userData) {
    return await this.User.create(userData);
  }

  async findByUsername(username) {
    return await this.User.findOne({ username });
  }

  async findByUrl(url) {
    return await this.User.findOne({ url });
  }

  async findById(userId) {
    return await this.User.findById(userId);
  }

  async updateProfile(userId, profileData) {
    console.log('Repository updateProfile:', { userId, profileData });
    return await this.User.findByIdAndUpdate(
      userId,
      { $set: profileData },
      { new: true }
    );
  }

  async getAllUsers() {
    return await this.User.find().select('-password -theme');
  }
}

module.exports = UserRepository;