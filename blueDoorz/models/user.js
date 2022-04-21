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
        notNull: {
          msg: `username is required`
        },
        notEmpty: {
          msg: `username is required`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password is required`
        },
        notEmpty: {
          msg: `password is required`
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `email is required`
        },
        notEmpty: {
          msg: `email is required`
        },
        isEmail: {
          msg: `your input must email`
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `name is required`
        },
        notEmpty: {
          msg: `name is required`
        }
      }
    },
    HouseId: DataTypes.INTEGER
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