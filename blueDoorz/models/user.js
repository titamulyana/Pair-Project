'use strict';
const {
  Model
} = require('sequelize');
const { bcryptPass } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.House)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(istance, options) {
        istance.password = bcryptPass(istance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};