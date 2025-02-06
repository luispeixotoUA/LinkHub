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
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
}, {
  hooks: {
    beforeCreate: async (link) => {
      if (!link.order) {
        const maxOrder = await Link.max('order', { 
          where: { userId: link.userId } 
        });
        link.order = (maxOrder || 0) + 1;
      }
    }
  }
});

Link.belongsTo(User, { foreignKey: 'userId' });
module.exports = Link;