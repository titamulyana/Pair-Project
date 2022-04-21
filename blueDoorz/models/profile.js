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
    get age(){
      return (new Date().getFullYear() - this.dateOfBirth.getFullYear())
    }

    get formatDate() {
      return this.dateOfBirth.toISOString().substring(10,0)
    }

    fullName() {
      return `${this.firstName} ${this.lastName}`
    }

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
        notNull: true,
        notEmpty: {
          msg: `First name is required`
        }
      }
    },
    lastName: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Name is required`
        }
      }
    },
    dateOfBirth: {
      type : DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `Date is required`
        },
        
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
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};