import db from "../models/index";

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
    let orders = await db.Order.findAll({
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
      ],
    });
    return {
      EM: "Success with get by pagination",
      EC: 0,
      DT: orders,
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
    });

    if (!orderFood) {
      return {
        EM: "Food not found in order",
        EC: -1,
        DT: "",
      };
    }

    const deletedRows = await orderFood.destroy();

    // Kiểm tra xem order còn chứa food nào hay không
    const remainingFoods = await db.Order_Food.count({
      where: { order_id: orderId },
    });

    // Nếu không còn food nào trong order, xóa order luôn
    if (remainingFoods === 0) {
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
};
