import express from "express";
import {
  handlePrint,
  handleRegister,
  handleLogin,
  handleLogout,
} from "../controller/apiController";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/userController";

import { newOrder } from "../controller/orderController";

import { checkUserJWT, checkUserPermission } from "../middleware/utils";

import { getAllGroups } from "../controller/groupController";

import { getAllFood } from "../controller/foodController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  //login-register router
  router.post("/register", handleRegister);
  router.get("/login", handleLogin);
  router.get("/logout", handleLogout);

  //user router
  router.get("/user/getAll", getAllUsers);
  router.get("/user/read", getUser);
  router.post("/user/create", createUser);
  router.put("/user/update", updateUser);
  router.delete("/user/delete", deleteUser);

  // food router
  router.get("/food/getAll", getAllFood);

  // Order
  router.post("/food/order", newOrder);

  //group router
  router.get("/group/getAll", getAllGroups);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
