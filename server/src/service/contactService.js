import db from "../models/index";
const { Op } = require("sequelize");

const addContact = async (fullName, email, message) => {
  try {
    const newContact = await db.Contact.create({
      fullName: fullName,
      email: email,
      message: message,
    });

    return {
      EM: "Successfully added contact",
      EC: 0,
      DT: newContact,
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

const getContactList = async () => {
  try {
    let contacts = await db.Contact.findAll({
      order: [["id", "ASC"]],
    });
    if (contacts) {
      return {
        EM: "Get contacts data success",
        EC: 0,
        DT: contacts,
      };
    } else {
      return {
        EM: "Get contacts data success",
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

const getContactByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Contact.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      contacts: rows,
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

module.exports = { addContact, getContactList, getContactByPagination };
