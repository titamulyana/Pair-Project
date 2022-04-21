'use strict';
const {
  Model, Op
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

    get formattedName() {
      return this.name.split(" ").join("-")
    }

    formatCurrency() {
      return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(this.price)
    }

    static searchHouse(searchByName, searchByAddress) {
      const options = {
        where: {},
      }
      if(searchByName || searchByAddress) {
          options.where = {
              name: {[Op.iLike]: `%${searchByName}%`},
              address: {[Op.iLike]: `%${searchByAddress}%`}
          }
      }

      return House.findAll(options)
    }
  }
  House.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    price: DataTypes.INTEGER,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'House',
    hooks: {
      beforeCreate(instance, options) {
        instance.status = true
      }
    }
  });
  return House;
};