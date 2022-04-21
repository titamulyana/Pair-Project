'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `first name is required`
        },
        notEmpty: {
          msg: `first name is required`
        }
      }
    },
    lastName: {
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
    dateOfBirth: {
      type : DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `date is required`
        },
        notEmpty: {
          msg: `date is required`
        }
      }
    },
    gender: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `gender is required`
        },
        notEmpty: {
          msg: `gender is required`
        }
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `address is required`
        },
        notEmpty: {
          msg: `address is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};