"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsToMany(models.Food, { through: models.Order_Food });
      Order.hasMany(models.Order_Food);
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      order_time: DataTypes.DATE,
      delivery_time: DataTypes.DATE,
      total_money: DataTypes.INTEGER,
      status_payment: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      shipper_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
