'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.User)
      Trip.belongsToMany(models.Destination,{
        through: models.TripDestination,
        foreignKey: "TripId"
      })
      // define association here
    }
  }
  Trip.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    bookingCode: DataTypes.STRING,
    image: DataTypes.STRING,
    UserId : DataTypes.INTEGER
   }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};