const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/sequelize');

// Repositórios
const UserRepository = require('./repositories/userRepository');
const LinkRepository = require('./repositories/linkRepository');

// Serviços
const UserService = require('./services/userService');
const AuthService = require('./services/authService');
const LinkService = require('./services/linkService');

// Rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

// Instância do Express
const app = express();

// Middlewares globais
app.use(bodyParser.json());

// Inicialização de repositórios
const userRepository = new UserRepository(require('./models/user'));
const linkRepository = new LinkRepository(require('./models/link'));

// Inicialização de serviços
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const linkService = new LinkService(linkRepository);

// Configuração de rotas
app.use('/auth', authRoutes(authService, userService));
app.use('/users', userRoutes(userService, linkService));
app.use('/links', linkRoutes(linkService));

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

// Exporta o app para o servidor
module.exports = app;
