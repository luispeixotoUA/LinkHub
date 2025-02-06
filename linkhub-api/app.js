const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/sequelize');

// Models
const User = require('./models/user');
const Link = require('./models/link');
const Metric = require('./models/metric');

// Repositories
const UserRepository = require('./repositories/userRepository');
const LinkRepository = require('./repositories/linkRepository');
const MetricRepository = require('./repositories/metricRepository');

// Initialize repositories
const userRepository = new UserRepository(User);
const linkRepository = new LinkRepository(Link);
const metricRepository = new MetricRepository(Metric, Link);

// Services
const UserService = require('./services/userService');
const AuthService = require('./services/authService');
const LinkService = require('./services/linkService');
const MetricService = require('./services/metricService');

// Initialize services
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const linkService = new LinkService(linkRepository);
const metricService = new MetricService(metricRepository, userRepository, linkRepository);

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');
const metricRoutes = require('./routes/metricRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes(authService, userService));
app.use('/users', userRoutes(userService, linkService));
app.use('/links', linkRoutes(linkService));
app.use('/metrics', metricRoutes(metricService));

sequelize.authenticate()
 .then(() => console.log('Database connected successfully'))
 .catch(err => console.error('Database connection failed:', err));

module.exports = app;