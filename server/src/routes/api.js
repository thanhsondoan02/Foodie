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

import { checkUserJWT, checkUserPermission } from "../middleware/utils";

import { getAllGroups } from "../controller/groupController";

import {
  getAllFood,
  getOrderFromUser,
  deleteFoodFromOrderByUser,
  updateQuantityInCart,
} from "../controller/foodController";

import { newOrder } from "../controller/orderController";

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

  // Show all order shopping cart of user
  router.get("/food/getAllOrder", getOrderFromUser);

  // delete food in shopping cart of user
  router.delete("/food/delete", deleteFoodFromOrderByUser);

  // update quantity in shopping cart
  router.put("/food/updateOrder", updateQuantityInCart);

  //group router
  router.get("/group/getAll", getAllGroups);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
