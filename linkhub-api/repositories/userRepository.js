class UserRepository {
    constructor(UserModel) {
      this.User = UserModel;
    }
  
    async createUser(userData) {
      try {
        return await this.User.create(userData);
      } catch (err) {
        console.error('Erro ao criar usuário:', err);
        throw new Error('Validation error: Unable to create user');
      }
    }
    
  
    async findByUsername(username) {
      console.log("Entrou no repository")
      return this.User.findOne({ where: { username } });
    }
  
    async findByUrl(url) {
      return this.User.findOne({ where: { url } });
    }
  
    async findById(userId) {
      return this.User.findByPk(userId);
    }
  }
  
  module.exports = UserRepository;
  