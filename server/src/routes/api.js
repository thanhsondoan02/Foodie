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
  uniqueCategoryFood,
  searchFood,
  addFoodToCart,
  convertToOrder,
  allOrderInSystem,
  verifyOrderByAdmin,
} from "../controller/foodController";

import { newOrder } from "../controller/orderController";

import {
  sendMail,
  contactEmailOfUser,
  getAllContact,
} from "../controller/mailController";

import { getAllBlog } from "../controller/blogController";

// tong hop routers
const router = express.Router();

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  //login-register router
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.get("/logout", handleLogout);

  //user router
  router.get("/user/getAll", getAllUsers);
  router.get("/user/read", getUser);
  router.post("/user/create", createUser);
  router.put("/user/update", updateUser);
  router.delete("/user/delete", deleteUser);

  // food router
  router.get("/food/getAll", getAllFood);

  // unique category food
  router.get("/food/category", uniqueCategoryFood);

  // search Food
  router.get("/food/search", searchFood);

  // Order
  router.post("/food/order", newOrder);

  // Show all order shopping cart of user
  router.get("/food/getAllOrder", getOrderFromUser);

  // delete food in shopping cart of user
  router.delete("/food/delete", deleteFoodFromOrderByUser);

  // update quantity in shopping cart
  router.put("/food/updateOrder", updateQuantityInCart);

  // append food to cart
  router.post("/food/appendOrder", addFoodToCart);

  //group router
  router.get("/group/getAll", getAllGroups);

  //server send mail
  router.post("/sendMail", sendMail);

  //get all blog
  router.get("/blog/get", getAllBlog);

  // client verify cart to order
  router.get("/food/order/verify", convertToOrder);

  // all order that client verify and only admin see
  router.get("/order/all", allOrderInSystem);

  // verify order by admin
  router.post("/order/verify", verifyOrderByAdmin);

  //Admin get all contact
  router.get("/contact/all", getAllContact);

  // client send contact
  router.post("/contact/send", contactEmailOfUser);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
