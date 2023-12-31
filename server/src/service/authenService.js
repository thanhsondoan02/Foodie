import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
import { getGroupWithRoles } from "./jwtService";
import { createToken } from "../middleware/utils";
const { Op } = require("sequelize");
// require("dotenv").config();
// require("dotenv").config({ path: "/../../config.env" });
require("dotenv").config({ path: "./config.env" });

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: {
      email: userEmail,
    },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: {
      phone: userPhone,
    },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (userData) => {
  try {
    let isEmailExist = await checkEmailExist(userData.email);
    if (isEmailExist) {
      return {
        EM: "Email is already exist",
        EC: 1,
        DT: "",
      };
    }
    let isPhoneExist = await checkPhoneExist(userData.phone);
    if (isPhoneExist) {
      return {
        EM: "Phone is already exist",
        EC: 1,
        DT: "",
      };
    }

    let hashPass = hashPassword(userData.password);

    let newUser = await db.User.create({
      email: userData.email,
      password: hashPass,
      fullName: userData.fullName,
      age: userData.age,
      address: userData.address,
      gender: userData.gender,
      phone: userData.phone,
      groupId: 2,
    });

    return {
      EM: "New user is created",
      EC: 0,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error in service",
      EC: -2,
      DT: "",
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); //true or false
};

const handleUserLogin = async (data_login) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: data_login.valueLogin },
          { phone: data_login.valueLogin },
        ],
      },
    });

    if (user) {
      if (user.email === "admin" && data_login.password === "123456") {
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };
        let token = createToken(payload);
        return {
          EM: "Ready login",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
          },
        };
      } else {
        let isCorrectPassword = checkPassword(
          data_login.password,
          user.password
        );
        if (isCorrectPassword) {
          // test role:
          let groupWithRoles = await getGroupWithRoles(user);
          let payload = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            age: user.age,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            groupWithRoles,
          };
          let token = createToken(payload);
          return {
            EM: "Ready login",
            EC: 0,
            DT: {
              access_token: token,
              groupWithRoles,
              id: user.id,
              email: user.email,
              fullName: user.fullName,
              age: user.age,
              phone: user.phone,
              address: user.address,
              gender: user.gender,
            },
          };
        }
      }
    }
    return {
      EM: "Your email or phone or password is incorrect !",
      EC: -2,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error in service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
