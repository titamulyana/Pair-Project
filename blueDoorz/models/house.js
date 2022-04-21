'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.hasMany(models.User)
    }
  }
  House.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};