const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user');

const Link = sequelize.define('Link', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Link.belongsTo(User, { foreignKey: 'userId' });
module.exports = Link;
