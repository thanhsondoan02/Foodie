import db from "../models/index";

const addOrder = async (foodList, idUser) => {
  try {
    let currentDate = new Date();
    var randomTime =
      Math.random() * (2 * 60 * 60 * 1000 - 30 * 60 * 1000) + 30 * 60 * 1000;
    const createdOrder = await db.Order.create({
      order_time: currentDate.getTime(),
      delivery_time: currentDate.getTime() + randomTime,
      total_money: 0, // Sẽ được tính toán sau
      status_payment: "Cart",
      user_id: idUser, // ID của người dùng
      shipper_id: 5, // ID của shipper
    });

    let total_money = 0;

    for (const food of foodList) {
      total_money += parseFloat(food.ItemPrice) * food.quantity;

      await db.Order_Food.create({
        order_id: createdOrder.id,
        food_id: food.id,
        quantity: food.quantity,
      });
    }

    const updatedOrder = await createdOrder.update({
      total_money: total_money,
    });

    return {
      EM: "Add order success",
      EC: 0,
      DT: updatedOrder,
    };
  } catch (error) {
    return {
      EM: "Error in service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  addOrder,
};
