"use strict";
const { Model } = require("sequelize");
// const bcrypt = require('bcryptjs');
const hashing = require("../helpers/bcrypt");
// hashing
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile);
      User.hasMany(models.Trip);
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
          notNull: {
            msg: 'username cant be null'
          },
          notEmpty:{
            msg: 'username cant be empty'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
          notNull: {
            msg: 'password cant be null'
          },
          notEmpty:{
            msg: 'password cant be empty'
          }
        }
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashing(user.password);
          user.role = "user";
        },
      },
    }
  );
  return User;
};
