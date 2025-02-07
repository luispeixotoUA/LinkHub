class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async findByUsername(username) {
    return this.userRepository.findByUsername(username);
  }

  async findById(id) {
    return this.userRepository.findById(id);
  }

  async findByUrl(url) {
    return this.userRepository.findByUrl(url);
  }

  async updateProfile(userId, profileData) {
    console.log('Service updateProfile:', { userId, profileData });
    
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (profileData.url) {
      const existingUser = await this.userRepository.findByUrl(profileData.url);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error('URL already taken');
      }
    }

    return this.userRepository.updateProfile(userId, profileData);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }
}

module.exports = UserService;