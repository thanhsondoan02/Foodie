import db from "../models/index";
const { Op } = require("sequelize");

const getBlogList = async () => {
  try {
    let blogs = await db.Blog.findAll({
      order: [["id", "ASC"]],
    });
    if (blogs) {
      return {
        EM: "Get blogs data success",
        EC: 0,
        DT: blogs,
      };
    } else {
      return {
        EM: "Get blogs data success",
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

const getBlogByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Blog.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      blogs: rows,
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

module.exports = { getBlogList, getBlogByPagination };
