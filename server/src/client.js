import express from "express";

const router = express.Router();

const initClientRoutes = (app) => {
  // router.all("*", checkUserJWT, checkUserPermission);

  router.post("/contact/send", express.static('../client/build'));

  return app.use("/api/v1/", router);
};

export default initClientRoutes;
