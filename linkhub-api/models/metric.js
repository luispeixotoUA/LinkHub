const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Link = require('./link');

const Metric = sequelize.define('Metric', {
 type: DataTypes.ENUM('LINK_CLICK', 'PROFILE_VIEW', 'LINK_CREATED', 'LINK_UPDATED'),
 userId: {
   type: DataTypes.INTEGER,
   allowNull: false,
   references: {
     model: 'Users', 
     key: 'id'
   }
 },
 linkId: {
   type: DataTypes.INTEGER,
   references: {
     model: 'Links',
     key: 'id'
   }
 }
});

Metric.belongsTo(Link, { 
 foreignKey: 'linkId',
 as: 'link'
});

module.exports = Metric;