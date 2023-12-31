import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, password, fullName) => {
  let hashPass = hashPassword(password);
  try {
    await db.User.create({
      email: email,
      password: password,
      fullName: fullName,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUserList = async () => {
  // User -> group -> role
  // let data = await db.User.findAll({
  //   where: { id: 1 },
  //   include: [
  //     {
  //       model: db.Group,
  //       include: [db.Role],
  //     },
  //   ],
  // });
  // return data;

  try {
    let users = [];
    users = await db.User.findAll({
      raw: true,
      nest: true,
    });
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

const updateUser = async (email, fullName, id) => {
  try {
    await db.User.update(
      { email: email, fullName: fullName },
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
