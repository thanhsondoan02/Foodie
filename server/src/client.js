import express from "express";

const router = express.Router();

const initClientRoutes = (app) => {
  app.use("/", express.static("./build"));
  app.use("/menu", express.static("./build"));
  app.use("/blog", express.static("./build"));
  app.use("/blog/:blogId", express.static("./build"));
  app.use("/contact", express.static("./build"));
  app.use("/about", express.static("./build"));
  app.use("/register", express.static("./build"));
  app.use("/cart", express.static("./build"));
  app.use("/profile", express.static("./build"));
  app.use("/careers", express.static("./build"));
  app.use("/refunds", express.static("./build"));
  app.use("/terms", express.static("./build"));
  app.use("/privacy", express.static("./build"));

  app.use("/cms", express.static("./build"));
};

export default initClientRoutes;
