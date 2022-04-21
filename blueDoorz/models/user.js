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
    username: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Username is required`
        },
        len: {
          args: [6,12],
          msg: `Username must be between 6 and 12 characters`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Password is required`
        },
        len: {
          args: [6,12],
          msg: `Password must be between 6 and 12 characters`
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Your input must be email`
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Role is required`
        }
      }
    },
    HouseId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = bcryptPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};