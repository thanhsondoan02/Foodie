import db from "../models/index";

const addOrder = async (foodList, idUser) => {
  // // Date
  // var currentDate = new Date();
  // var currentHour = currentDate.getHours();
  // var currentMinute = currentDate.getMinutes();
  // var currentSecond = currentDate.getSeconds();
  // var randomTime =
  //   Math.random() * (2 * 60 * 60 * 1000 - 30 * 60 * 1000) + 30 * 60 * 1000;
  // // Get amount of order
  // const amount = await db.Order.count();
  // // Calculate total money and add to Order_Food
  // let total_money = 0;
  // for (var i = 0; i < foodList.length; i++) {
  //   total_money += Number(foodList[i].ItemPrice) * Number(foodList[i].quantity);
  //   // let order_food = await db.Order_Food.create({
  //   //   order_id: amount + 1,
  //   //   food_id: Number(foodList[i].id),
  //   //   quantity: Number(foodList[i].quantity),
  //   // });
  // }
  // let newOrder = await db.Order.create(
  //   {
  //     order_time: currentDate.getTime(),
  //     delivery_time: currentDate.getTime() + randomTime,
  //     total_money: total_money,
  //     status_payment: "Pending",
  //     user_id: idUser,
  //     shipper_id: 3,
  //     food: [
  //       {
  //         name: "Queen",
  //         User_Profile: {
  //           selfGranted: true,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     include: Food,
  //   }
  // );
  // return {
  //   EM: "New order from service",
  //   EC: 0,
  //   DT: newOrder,
  // };

  try {
    let currentDate = new Date();
    var randomTime =
      Math.random() * (2 * 60 * 60 * 1000 - 30 * 60 * 1000) + 30 * 60 * 1000;
    const createdOrder = await db.Order.create({
      order_time: currentDate.getTime(),
      delivery_time: currentDate.getTime() + randomTime,
      total_money: 0, // Sẽ được tính toán sau
      status_payment: "pending",
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
