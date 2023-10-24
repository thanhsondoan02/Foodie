import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  try {
    await db.User.create({
      email: email,
      password: password,
      username: username,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUserList = async () => {
  try {
    let users = [];
    users = await db.User.findAll();
    return users;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUserById = async (id) => {
  try {
    let user = {};
    user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return user.get({ plain: true });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const updateUser = async (email, username, id) => {
  try {
    await db.User.update(
      { email: email, username: username },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (err) {
    console.log("Error: ", err);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
