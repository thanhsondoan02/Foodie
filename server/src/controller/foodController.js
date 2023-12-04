import {
  getFoodList,
  deleteFoodById,
  getFoodByName,
  updateFoodById,
  getFoodByPagination,
} from "../service/foodService";

const getAllFood = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await getFoodByPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
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

module.exports = {
  getAllFood,
};
