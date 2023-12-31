import db from "../models/index";
const { Op } = require("sequelize");

const getFoodList = async () => {
  try {
    let foods = await db.Food.findAll({
      order: [["id", "DESC"]],
    });
    if (foods) {
      //   let data = Foods.get({ plain: true });
      return {
        EM: "Get food data success",
        EC: 0,
        DT: foods,
      };
    } else {
      return {
        EM: "Get food data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const getFoodByPaginationAndCategory = async (page, limit, category) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Food.findAndCountAll({
      offset: offset,
      limit: limit,
      where: { Category: category },
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      foods: rows,
    };
    return {
      EM: "Success with get by pagination",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const getFoodByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Food.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      foods: rows,
    };
    return {
      EM: "Success with get by pagination",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const getFoodByName = async (name) => {
  try {
    let food = {};
    food = await db.Food.findOne({
      where: {
        ItemName: name,
      },
    });
    return food.get({ plain: true });
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const updateFoodById = async (data) => {
  try {
    let food = await db.Food.findOne({
      where: {
        id: data.id,
      },
    });
    if (food) {
      await db.Food.update(
        {
          type_id: data.type_id,
          ItemImg: data.ItemImg,
          ItemName: data.ItemName,
          ItemIngredients: data.ItemIngredients,
          ItemPrice: data.ItemPrice,
          ItemPriceBefore: data.ItemPriceBefore,
          Category: data.Category,
          sale: data.sale,
          attributes: data.attributes,
        },
        {
          where: {
            id: data.id,
          },
        }
      );

      return {
        EM: "Update food success",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Food not found",
        EC: -1,
        DT: "",
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const deleteFoodById = async (id) => {
  try {
    let food = await db.Food.findOne({
      where: {
        id: id,
      },
    });
    if (food) {
      await food.destroy();

      return {
        EM: "Delete food success",
        EC: -2,
        DT: food,
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

// Lấy ra tất cả các món trong giỏ hàng
const getAllOrder = async (idUser) => {
  try {
    // console.log(">>>>>>. CHECK ID USER IN SERVICE: ", idUser);
    // let orders = await db.Order.findAll({
    //   where: {
    //     user_id: idUser,
    //     status_payment: "Cart",
    //     // id: {
    //     //   [db.Sequelize.Op.in]: db.Sequelize.literal(
    //     //     `(SELECT order_id FROM Order_Food WHERE order_id = Order.id)`
    //     //   ),
    //     // },
    //   }, // Lọc đơn hàng theo id người dùng
    //   include: [
    //     {
    //       // model: db.Order_Food,
    //       // include: [
    //       //   {
    //       //     model: db.Food,
    //       //   },
    //       // ],
    //       model: db.Food,
    //       // required: true,
    //     },
    //   ],
    // });

    const { count, rows } = await db.Order.findAndCountAll({
      where: {
        user_id: idUser,
        status_payment: "Cart",
        // id: {
        //   [db.Sequelize.Op.in]: db.Sequelize.literal(
        //     `(SELECT order_id FROM Order_Food WHERE order_id = Order.id)`
        //   ),
        // },
      }, // Lọc đơn hàng theo id người dùng
      include: [
        {
          // model: db.Order_Food,
          // include: [
          //   {
          //     model: db.Food,
          //   },
          // ],
          model: db.Food,
          // required: true,
        },
        {
          model: db.User,
          attributes: ["fullName", "age", "address", "gender", "phone"],
        },
      ],
    });

    let data = {
      totalFoodInCart: count,
      foods: rows,
    };

    return {
      EM: "Get All Order of User",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

// Xóa món ăn trong giỏ hàng
const deleteFoodFromOrder = async (orderId, foodId) => {
  try {
    // Tìm orderFood cần xóa
    const orderFood = await db.Order_Food.findOne({
      where: {
        order_id: orderId,
        food_id: foodId,
      },
      include: {
        model: db.Order,
        // attributes: ["total_money"],
      },
    });

    if (!orderFood) {
      return {
        EM: "Food not found in order",
        EC: -1,
        DT: "",
      };
    }

    const deletedRows = await orderFood.destroy();

    // Tính lại total_money của order
    const order = await db.Order.findByPk(orderId);
    const remainingFoods = await db.Order_Food.findAll({
      where: { order_id: orderId },
      include: {
        model: db.Food,
        attributes: ["ItemPrice"],
      },
    });

    let updatedTotalMoney = 0;
    remainingFoods.forEach((food) => {
      updatedTotalMoney += food.Food.ItemPrice * food.quantity;
    });

    const updatedOrder = await order.update({
      total_money: updatedTotalMoney,
    });

    // Kiểm tra xem order còn chứa food nào hay không
    const remainingFoodsCount = await db.Order_Food.count({
      where: { order_id: orderId },
    });

    // Nếu không còn food nào trong order, xóa order luôn
    if (remainingFoodsCount === 0) {
      await db.Order.destroy({ where: { id: orderId } });
    }

    return {
      EM: "Successfully deleted food from order",
      EC: 0,
      DT: deletedRows,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: "",
    };
  }
};

const updateOrder = async (orderId, foodId, quantity) => {
  try {
    // Tìm orderFood trong Order_Food
    const orderFood = await db.Order_Food.findOne({
      where: {
        order_id: orderId,
        food_id: foodId,
      },
    });

    console.log(">>>>>>> order food: ", orderFood);

    if (!orderFood) {
      return {
        EM: "Food not found in order",
        EC: -1,
        DT: "",
      };
    }

    // Tìm food trong Food
    const food = await db.Food.findByPk(foodId);

    if (!food) {
      return {
        EM: "Food not found",
        EC: -1,
        DT: "",
      };
    }

    // Tính toán giá mới
    const newPrice = parseFloat(food.ItemPrice) * quantity;

    console.log("New price is: ", newPrice);

    // Cập nhật quantity mới trong orderFood
    orderFood.quantity = quantity;
    await orderFood.save();

    // Tính toán tổng giá trị total_money mới của order
    const orderFoods = await db.Order_Food.findAll({
      where: { order_id: orderId },
    });

    let orderTotalMoney = 0;

    for (const orderFood of orderFoods) {
      const food = await db.Food.findByPk(orderFood.food_id);
      if (food) {
        orderTotalMoney +=
          parseFloat(orderFood.quantity) * parseFloat(food.ItemPrice);
      }
    }

    console.log("Total money is: ", orderTotalMoney);

    // Cập nhật total_money mới trong Order
    const order = await db.Order.findByPk(orderId);
    order.total_money = orderTotalMoney;
    await order.save();

    return {
      EM: "Successfully updated order",
      EC: 0,
      DT: order,
    };
  } catch (err) {
    return {
      EM: "Error in service",
      EC: -2,
      DT: "",
    };
  }
};

const getAllCategoryFood = async () => {
  try {
    const uniqueCategories = await db.Food.findAll({
      attributes: ["Category"],
      group: ["Category"],
    });

    return {
      EM: "Success with unique Category of Food",
      EC: 0,
      DT: uniqueCategories,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const searchFoodByItemName = async (foodName) => {
  try {
    console.log(">>>>> Food name is: ", foodName);
    const foods = await db.Food.findAll({
      where: {
        ItemName: {
          [Op.substring]: foodName,
        },
      },
    });

    return {
      EM: "Success with search Food",
      EC: 0,
      DT: foods,
    };
  } catch (err) {
    // console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const searchFoodByItemNameWithPagination = async (foodName, page, limit) => {
  try {
    console.log(">>>>> Food name is: ", foodName, page, limit);
    const offset = (page - 1) * limit;
    console.log(">>>>>>>>> limit, offset: ", limit, offset);
    const { count, rows } = await db.Food.findAndCountAll({
      where: {
        ItemName: {
          [Op.substring]: foodName,
        },
      },
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      foods: rows,
    };

    return {
      EM: "Success with search Food with Paginate",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const appendFoodToCart = async (listFood, idUser) => {
  try {
    const orders = await db.Order.findAll({
      where: {
        user_id: idUser,
        status_payment: "Cart",
      },
    });

    if (orders.length === 0) {
      let currentDate = new Date();
      var randomTime =
        Math.random() * (2 * 60 * 60 * 1000 - 30 * 60 * 1000) + 30 * 60 * 1000;

      const newOrder = await db.Order.create({
        order_time: currentDate.getTime(),
        delivery_time: currentDate.getTime() + randomTime,
        total_money: 0, // Sẽ được tính toán sau
        user_id: idUser,
        status_payment: "Cart",
        // shipper_id: 5, // ID của shipper
      });

      let total_money = 0;

      for (const food of listFood) {
        total_money += parseFloat(food.ItemPrice) * food.quantity;

        await db.Order_Food.create({
          order_id: newOrder.id,
          food_id: food.id,
          quantity: food.quantity,
        });
      }

      const updatedOrder = await newOrder.update({
        total_money: total_money,
      });

      return {
        EM: "Success in creating order with food",
        EC: 0,
        DT: updatedOrder,
      };
    } else {
      const existingOrder = orders[0];

      for (const food of listFood) {
        // Kiểm tra xem món ăn đã tồn tại trong đơn hàng chưa
        const existingFood = await db.Order_Food.findOne({
          where: {
            order_id: existingOrder.id,
            food_id: food.id,
          },
        });

        if (existingFood) {
          // Cập nhật số lượng của món ăn đã tồn tại
          existingFood.quantity += food.quantity;
          await existingFood.save();

          // Tính lại total_money của đơn hàng
          existingOrder.total_money +=
            parseFloat(food.ItemPrice) * food.quantity;
        } else {
          // Tạo món ăn mới trong đơn hàng
          await db.Order_Food.create({
            order_id: existingOrder.id,
            food_id: food.id,
            quantity: food.quantity,
          });

          // Tính lại total_money của đơn hàng
          existingOrder.total_money +=
            parseFloat(food.ItemPrice) * food.quantity;
        }
      }

      await existingOrder.save();

      return {
        EM: "Success in adding food to existing order",
        EC: 0,
        DT: existingOrder,
      };
    }
  } catch (err) {
    return {
      EM: "Error in service",
      EC: -2,
      DT: null,
    };
  }
};

const convertCartToOrder = async (idUser) => {
  try {
    let convertCart = await db.Order.findOne({
      where: {
        user_id: idUser,
        status_payment: "Cart",
      },
      include: [
        {
          model: db.User,
          attributes: ["fullName", "age", "address", "gender", "phone"],
        },
      ],
    });

    const updatedCartToOrder = await convertCart.update({
      status_payment: "Order Verify from Client",
    });

    io.emit("Order Verify from Client", updatedCartToOrder);

    return {
      EM: "Success convert cart to order by Client",
      EC: 0,
      DT: updatedCartToOrder,
    };
  } catch (err) {
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const allOrder = async () => {
  try {
    let orders = await db.Order.findAll({
      where: {
        status_payment: {
          [Op.ne]: "Cart",
        },
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "age", "address", "gender", "phone"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    if (orders) {
      return {
        EM: "Get all orders data success (no paginate)",
        EC: 0,
        DT: orders,
      };
    } else {
      return {
        EM: "Get orders data success (no paginate)",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const allOrderByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Order.findAndCountAll({
      where: {
        status_payment: {
          [Op.ne]: "Cart",
        },
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "age", "address", "gender", "phone"],
        },
      ],
      offset: offset,
      limit: limit,
      // order: [["order_time", "DESC"]],
      order: [["updatedAt", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      orders: rows,
    };
    return {
      EM: "Success with orders get by pagination",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const verifyOrder = async (orderId) => {
  try {
    console.log(">>>>>> orderId in service is: ", orderId);
    let orderVerifyByAdmin = await db.Order.findOne({
      where: {
        id: orderId,
        status_payment: "Order Verify from Client",
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "age", "address", "gender", "phone"],
        },
      ],
    });

    const adminVerifiedShippers = await db.Order.findAll({
      attributes: ["shipper_id"],
      where: {
        status_payment: "Order Verify from Admin",
      },
    });

    const shipperIds = adminVerifiedShippers.map((order) => order.shipper_id);

    console.log(">>>>>>>>.. shipperIds: ", shipperIds);

    const availableShippers = await db.User.findAll({
      where: {
        groupId: 3, // Chỉ tìm các user có groupId = 3 (shipper)
        id: {
          [Op.notIn]: shipperIds,
        },
      },
    });

    console.log(
      ">>>>> Availableshippers: ",
      JSON.stringify(availableShippers, null, 2)
    );

    console.log(
      ">>>>>>>>>> order_time current is: ",
      `${orderVerifyByAdmin.order_time}`
    );

    let selectedShipperId;

    if (availableShippers.length === 0) {
      const nearestDeliveryOrder = await db.Order.findOne({
        where: {
          status_payment: "Order Verify from Admin",
        },
        order: [
          [
            db.sequelize.literal(
              `ABS(TIMESTAMPDIFF(SECOND, "${orderVerifyByAdmin.order_time}", delivery_time))`
            ),
            "ASC",
          ],
        ],
      });

      console.log(
        ">>>>> nearestDeliveryOrder: ",
        JSON.stringify(nearestDeliveryOrder, null, 2)
      );

      if (nearestDeliveryOrder) {
        selectedShipperId = nearestDeliveryOrder.shipper_id;
        console.log(
          ">>>>>>>> Print selected Shipper Id in if: ",
          selectedShipperId
        );
      }
    } else {
      selectedShipperId =
        availableShippers[Math.floor(Math.random() * availableShippers.length)];
      console.log(
        ">>>>>>>> Print selected Shipper Id in else: ",
        selectedShipperId.id
      );
    }

    const updatedOrderVerifyByAdmin = await orderVerifyByAdmin.update({
      status_payment: "Order Verify from Admin",
      shipper_id: selectedShipperId.id,
    });

    return {
      EM: "Order Verify from Admin",
      EC: 0,
      DT: updatedOrderVerifyByAdmin,
    };
  } catch (err) {
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const historyOrderOfUser = async (idUser) => {
  try {
    let orders = await db.Order.findAll({
      where: {
        status_payment: {
          [Op.ne]: "Cart",
        },
        user_id: idUser,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "age", "address", "gender", "phone"],
        },
      ],
      // order: [["id", "ASC"]],
      order: [["updatedAt", "DESC"]],
    });
    if (orders) {
      return {
        EM: "Get all orders data success (no paginate)",
        EC: 0,
        DT: orders,
      };
    } else {
      return {
        EM: "Get orders data success (no paginate)",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};
const historyOrderOfUserByPagination = async (idUser, page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Order.findAndCountAll({
      where: {
        status_payment: {
          [Op.ne]: "Cart",
        },
        user_id: idUser,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "age", "address", "gender", "phone"],
        },
      ],
      offset: offset,
      limit: limit,
      // order: [["id", "ASC"]],
      order: [["updatedAt", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      orders: rows,
    };
    return {
      EM: "Success with orders get by pagination",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const currentOrderShipperWorking = async (idUser) => {
  try {
    let orders = await db.Order.findAll({
      where: {
        // status_payment: "Order Verify from Admin",
        shipper_id: idUser,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "age", "address", "gender", "phone"],
        },
        {
          model: db.Food,
        },
      ],
    });
    if (orders) {
      return {
        EM: "Get all orders shipper must delivery",
        EC: 0,
        DT: orders,
      };
    } else {
      return {
        EM: "Get all orders shipper must delivery ===> ERROR",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const currentOrderShipperWorkingByPagination = async (idUser, page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Order.findAndCountAll({
      where: {
        // status_payment: "Order Verify from Admin",
        shipper_id: idUser,
      },
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      orders: rows,
    };
    return {
      EM: "Success with orders get by pagination",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const shipperConfirmDeliveryFromUser = async (orderId, idShipper) => {
  try {
    let order = await db.Order.findOne({
      where: {
        // status_payment: "Order Verify from Admin",
        id: orderId,
        shipper_id: idShipper,
      },
    });
    if (order) {
      await order.update({
        status_payment: "Shipper Delivering",
      });
      return {
        EM: "Get orders data success",
        EC: 0,
        DT: order,
      };
    } else {
      return {
        EM: "No order find in service with shipper id",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const shipperConfirmPaidFromUser = async (orderId, idShipper) => {
  try {
    let order = await db.Order.findOne({
      where: {
        // status_payment: "Order Verify from Admin",
        id: orderId,
        shipper_id: idShipper,
      },
    });
    if (order) {
      await order.update({
        status_payment: "Paid",
      });
      return {
        EM: "Get orders data success",
        EC: 0,
        DT: order,
      };
    } else {
      return {
        EM: "No order find in service with shipper id",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getFoodList,
  deleteFoodById,
  getFoodByName,
  updateFoodById,
  getFoodByPagination,
  getFoodByPaginationAndCategory,
  getAllOrder,
  deleteFoodFromOrder,
  updateOrder,
  getAllCategoryFood,
  searchFoodByItemName,
  searchFoodByItemNameWithPagination,
  appendFoodToCart,
  convertCartToOrder,
  allOrder,
  allOrderByPagination,
  verifyOrder,
  historyOrderOfUser,
  historyOrderOfUserByPagination,
  currentOrderShipperWorking,
  currentOrderShipperWorkingByPagination,
  shipperConfirmDeliveryFromUser,
  shipperConfirmPaidFromUser,
};
