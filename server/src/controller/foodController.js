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

const convertToOrder = async (req, res) => {
  try {
    let idUser = req.user.id;
    let convertCart = await convertCartToOrder(idUser);
    return res.status(200).json({
      EM: convertCart.EM,
      EC: 0, // -1 -> error, 0 -> success,
      DT: convertCart.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const allOrderInSystem = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await allOrderByPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    } else {
      let data = await allOrder();
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

const verifyOrderByAdmin = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    console.log(">>>>>>orderId in controller is: ", orderId);
    let verify_order = await verifyOrder(orderId);
    return res.status(200).json({
      EM: verify_order.EM,
      EC: 0, // -1 -> error, 0 -> success,
      DT: verify_order.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const historyOrder = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let idUser = req.user.id;

      let data = await historyOrderOfUserByPagination(idUser, +page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    } else {
      let idUser = req.user.id;
      let data = await historyOrderOfUser(idUser);
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

const currentOrderShipper = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let idUser = req.user.id;
      let data = await currentOrderShipperWorkingByPagination(
        idUser,
        +page,
        +limit
      );
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    } else {
      let idUser = req.user.id;
      let data = await currentOrderShipperWorking(idUser);
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

const shipperConfirmDelivery = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    let idShipper = req.user.id;
    let data = await shipperConfirmDeliveryFromUser(orderId, idShipper);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // -1 -> error, 0 -> success,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const shipperConfirmPaid = async (req, res) => {
  try {
    let orderId = req.query.orderId;
    let idShipper = req.user.id;

    let data = await shipperConfirmPaidFromUser(orderId, idShipper);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // -1 -> error, 0 -> success,
      DT: data.DT,
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
  convertToOrder,
  allOrderInSystem,
  verifyOrderByAdmin,
  historyOrder,
  currentOrderShipper,
  shipperConfirmDelivery,
  shipperConfirmPaid,
};
