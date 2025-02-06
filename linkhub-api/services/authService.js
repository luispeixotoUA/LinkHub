const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    // Verificar se o username já está em uso
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already taken');
    }

    // Verificar se o URL padrão (baseado no username) já está em uso
    let url = userData.username; // Default URL
    let theme = "{'backgroundColor':'#1e1e1e','textColor':'#ffffff'}"
    let profilePicture = userData.username;
    const existingUrl = await this.userRepository.findByUrl(url);
    if (existingUrl) {
      // Gerar um URL único
      url = await this.generateUniqueUrl(url);
    }

    // Criar usuário com o URL único
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
      url, // Usar o URL único gerado
      theme,
      profilePicture
    });
  }

  // Gerar URL único baseado no username
  async generateUniqueUrl(baseUrl) {
    let uniqueUrl = baseUrl;
    let counter = 1;

    while (await this.userRepository.findByUrl(uniqueUrl)) {
      uniqueUrl = `${baseUrl}-${counter}`;
      counter++;
    }

    return uniqueUrl;
  }


  async login(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');

    const token = jwt.sign({
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
      url: user.url,
      profilePicture: user.profilePicture,
    }, 'secretKey', { expiresIn: '1h' });

    return token;
  }

  // Gerar URL único baseado no username
  async generateUniqueUrl(baseUrl) {
    let uniqueUrl = baseUrl;
    let counter = 1;

    while (await this.userRepository.findByUrl(uniqueUrl)) {
      uniqueUrl = `${baseUrl}-${counter}`;
      counter++;
    }

    return uniqueUrl;
  }

}

module.exports = AuthService;
