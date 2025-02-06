const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true }, // Login e identificador público
  password: { type: DataTypes.STRING, allowNull: false }, // Senha encriptada
  displayName: { type: DataTypes.STRING, allowNull: true }, // Nome visível (default: username)
  profilePicture: { type: DataTypes.STRING, allowNull: true }, // URL da foto de perfil
  theme: { type: DataTypes.JSON, allowNull: true }, // Configurações de cores
  url: { type: DataTypes.STRING, allowNull: false, unique: true }, // URL do perfil (default: username)
  isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // Permissões de administrador
});

module.exports = User;
