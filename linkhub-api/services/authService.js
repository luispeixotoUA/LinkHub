const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const { MongoClient } = require('mongodb');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already taken');
    }

    let url = userData.username;
    
    let theme = "{'primaryColor': '#059669', 'backgroundColor': '#f0fdf4', 'textColor': '#064e3b', 'borderRadius': 'large'}";
    let profilePicture = userData.username;
    const existingUrl = await this.userRepository.findByUrl(url);
    if (existingUrl) {
      url = await this.generateUniqueUrl(url);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
      url,
      theme,
      profilePicture
    });
  }

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
