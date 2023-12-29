import { getBlogList, getBlogByPagination } from "../service/blogService";

const getAllBlog = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await getBlogByPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    } else {
      let data = await getBlogList();
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

module.exports = { getAllBlog };
