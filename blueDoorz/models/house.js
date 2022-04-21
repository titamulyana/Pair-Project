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

    get genderIndo() {
      if (this.gender === "male") return "Laki-laki"
      else if (this.gender === "female") return "Perempuan"
      else return "Campuran"
    }

    formatCurrency() {
      return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(this.price)
    }

    static searchHouse(searchByName, searchByAddress) {
      const options = {
        where: {status: true}
      }

      if(searchByName || searchByAddress) {
          options.where = {
            ...options.where,
              name: {[Op.iLike]: `%${searchByName}%`},
              address: {[Op.iLike]: `%${searchByAddress}%`}
          }
      }

      return House.findAll(options)
    }
  }
  House.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Name is required`
        }
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Address is required`
        }
      }
    },
    rooms: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Room Amount is required`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    description: {
      type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Description is required`
        }
      }
    },
    imageURL: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Image is required`
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Price is required`
        }
      }
    },
    gender: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Gender is required`
        }
      }
    },
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