const express = require('express');
const bodyParser = require('body-parser');

require('./models/db');

// Models
const User = require('./models/User');
const Link = require('./models/Link');
const Metric = require('./models/Metric');

// Repositories
const UserRepository = require('./repositories/UserRepository');
const LinkRepository = require('./repositories/LinkRepository');
const MetricRepository = require('./repositories/MetricRepository');

// Services
const UserService = require('./services/userService');
const AuthService = require('./services/authService');
const LinkService = require('./services/linkService');
const MetricService = require('./services/metricService');

// Initialize repositories
// app.js
const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);

const linkRepository = new LinkRepository(Link);
const metricRepository = new MetricRepository(Metric, Link);

// Initialize services
const userService = new UserService(userRepository);
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

module.exports = app;