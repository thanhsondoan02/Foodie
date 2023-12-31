import { getGroupList } from "../service/groupService";

const getAllGroups = async (req, res) => {
  try {
    let data = await getGroupList();

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
  getAllGroups,
};
