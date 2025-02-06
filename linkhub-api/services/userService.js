class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    // Buscar usuário por username
    async findByUsername(username) {
        console.log('username', username)
      return this.userRepository.findByUsername(username);
    }

    // Buscar usuário por id
    async findById(id) {
        return this.userRepository.findById(id);
      }
  
    // Buscar usuário por URL
    async findByUrl(url) {
      return this.userRepository.findByUrl(url);
    }
  
    // Atualizar perfil do usuário
    async updateProfile(userId, profileData) {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      // Verificar se o novo URL é único
      if (profileData.url) {
        const existingUser = await this.userRepository.findByUrl(profileData.url);
        if (existingUser && existingUser.id !== userId) {
          throw new Error('URL already taken');
        }
      }
  
      // Atualizar dados do usuário
      const updatedUser = await user.update({
        displayName: profileData.displayName || user.displayName,
        profilePicture: profileData.profilePicture || user.profilePicture,
        theme: profileData.theme || user.theme,
        url: profileData.url || user.url,
      });
  
      return updatedUser;
    }
  }
  
  module.exports = UserService;
  