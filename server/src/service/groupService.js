import db from "../models/index";

const getGroupList = async () => {
  try {
    let groups = await db.Group.findAll();
    if (groups) {
      return {
        EM: "Get data group success",
        EC: 0,
        DT: groups,
      };
    } else {
      return {
        EM: "Get data group success",
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
  getGroupList,
};
