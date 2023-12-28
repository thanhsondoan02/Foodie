import {
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
} from "../service/foodService";

const getAllFood = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      if (req.query.category) {
        let page = req.query.page;
        let limit = req.query.limit;
        let category = req.query.category;

        let data = await getFoodByPaginationAndCategory(
          +page,
          +limit,
          category
        );
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC, // -1 -> error, 0 -> success,
          DT: data.DT,
        });
      } else {
        let page = req.query.page;
        let limit = req.query.limit;

        let data = await getFoodByPagination(+page, +limit);
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC, // -1 -> error, 0 -> success,
          DT: data.DT,
        });
      }
    } else {
      let data = await getFoodList();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    }
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const getOrderFromUser = async (req, res) => {
  try {
    let idUser = req.user.id;
    // console.log(">>>>>> check id user: ", idUser);
    let listOrderFood = await getAllOrder(idUser);
    return res.status(200).json({
      EM: "Show all",
      EC: 0, // -1 -> error, 0 -> success,
      DT: listOrderFood.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const deleteFoodFromOrderByUser = async (req, res) => {
  try {
    const { orderId, foodId } = req.query;

    let foodDelete = await deleteFoodFromOrder(orderId, foodId);
    return res.status(200).json({
      EM: foodDelete.EM,
      EC: 0, // -1 -> error, 0 -> success,
      DT: foodDelete.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const updateQuantityInCart = async (req, res) => {
  try {
    const { orderId, foodId, quantity } = req.query;

    console.log(
      ">>>>>>> check orderId, foodId, quantity: ",
      orderId,
      foodId,
      quantity
    );

    let update_order = await updateOrder(orderId, foodId, quantity);

    return res.status(200).json({
      EM: update_order.EM,
      EC: 0, // -1 -> error, 0 -> success,
      DT: update_order.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const addFoodToCart = async (req, res) => {
  let listFood = req.body;
  try {
    if (listFood) {
      let idUser = req.user.id;
      let order = await appendFoodToCart(listFood, idUser);
      return res.status(200).json({
        EM: order.EM,
        EC: 0, // -1 -> error, 0 -> success,
        DT: order.DT,
      });
    } else {
      return res.status(200).json({
        EM: "Error listFood (maybe)",
        EC: -1, // -1 -> error, 0 -> success,
        DT: "",
      });
    }
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const uniqueCategoryFood = async (req, res) => {
  try {
    let unique_category = await getAllCategoryFood();

    return res.status(200).json({
      EM: unique_category.EM,
      EC: 0, // -1 -> error, 0 -> success,
      DT: unique_category.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const searchFood = async (req, res) => {
  try {
    let food_name = req.query.foodName;

    let foodItem;
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      foodItem = await searchFoodByItemNameWithPagination(
        food_name,
        +page,
        +limit
      );
    } else {
      foodItem = await searchFoodByItemName(food_name);
    }

    return res.status(200).json({
      EM: foodItem.EM,
      EC: 0, // -1 -> error, 0 -> success,
      DT: foodItem.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

module.exports = {
  getAllFood,
  getOrderFromUser,
  deleteFoodFromOrderByUser,
  updateQuantityInCart,
  searchFood,
  uniqueCategoryFood,
  addFoodToCart,
};