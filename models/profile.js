"use strict";
const { Model } = require("sequelize");
// const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User);
      // define association here
    }
    
    get firstName() {
     return this.name.split(' ')[0]
    }

  }
  Profile.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      profilePicture: {
        type :DataTypes.STRING,
        defaultValue:"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
   

    }
  );
  return Profile;
};
