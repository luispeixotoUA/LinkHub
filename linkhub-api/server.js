const app = require('./app');
const sequelize = require('./models/sequelize');

// Inicialização do banco de dados e servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(3001, () => console.log('Server running on http://localhost:3001'));
});
