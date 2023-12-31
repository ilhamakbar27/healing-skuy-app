'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Destination.belongsToMany(models.Trip,{
        through: models.TripDestination,
        foreignKey: "DestinationId",
      })
      // define association here
    }
  }
  Destination.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};