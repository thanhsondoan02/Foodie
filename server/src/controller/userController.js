import {
  getUserList,
  deleteUserById,
  getUserById,
  updateUserById,
  getUserByPagination,
} from "../service/userApiService";

// get all user
const getAllUsers = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await getUserByPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    } else {
      let data = await getUserList();
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

const createUser = async (req, res) => {};

const getUser = async (req, res) => {
  return res.status(200).json({
    EM: "Get User Info",
    EC: 0, // -1 -> error, 0 -> success,
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
      fullName: req.user.fullName,
      age: req.user.age,
      phone: req.user.phone,
      address: req.user.address,
      gender: req.user.gender,
    },
  });
};

const updateUser = async (req, res) => {
  try {
    let data = await updateUserById(req.body);
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

const deleteUser = async (req, res) => {
  try {
    if (req.query.id) {
      let data = await deleteUserById(req.query.id);
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
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
