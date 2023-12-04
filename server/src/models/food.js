"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Food.belongsToMany(models.Order, { through: models.Order_Food });
      Food.hasMany(models.Order_Food);
      // define association here
    }
  }
  Food.init(
    {
      type_id: DataTypes.STRING,
      ItemImg: DataTypes.STRING,
      ItemName: DataTypes.STRING,
      ItemIngredients: DataTypes.STRING,
      ItemPrice: DataTypes.STRING,
      ItemPriceBefore: DataTypes.STRING,
      Category: DataTypes.STRING,
      sale: DataTypes.BOOLEAN,
      attributes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
