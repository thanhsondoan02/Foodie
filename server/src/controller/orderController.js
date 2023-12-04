import { addOrder } from "../service/orderService";

const newOrder = async (req, res) => {
  let listFood = req.body;
  try {
    if (listFood) {
      let idUser = req.user.id;
      let order = await addOrder(listFood, idUser);
      return res.status(200).json({
        EM: "Add new order success",
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

module.exports = {
  newOrder,
};
