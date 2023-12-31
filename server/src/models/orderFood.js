"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order_Food.belongsTo(models.Order);
      // Order_Food.belongsTo(models.Food);

      Order_Food.belongsTo(models.Order, { foreignKey: "order_id" });
      Order_Food.belongsTo(models.Food, { foreignKey: "food_id" });
    }
  }
  Order_Food.init(
    {
      order_id: DataTypes.INTEGER,
      food_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Food",
    }
  );
  return Order_Food;
};
