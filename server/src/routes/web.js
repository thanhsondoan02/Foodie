import express from "express";
import {
  addUser,
  handleHelloHien,
  handleUser,
  handleDeleteUser,
  handleUpdateUser,
  getUserFromId,
} from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", handleHelloHien);
  router.get("/users", handleUser);
  router.post("/users/create", addUser);
  router.post("/users/delete/:id", handleDeleteUser);
  router.get("/users/get/:id", getUserFromId);
  router.post("/users/update/", handleUpdateUser);

  return app.use("/", router);
};

export default initWebRoutes;
