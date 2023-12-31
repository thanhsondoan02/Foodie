import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config({ path: "./config.env" });
import bodyParser from "body-parser";
import connection_DB from "./config/connectDB";
import cookieParser from "cookie-parser";
import initClientRoutes from "./client";
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 8080;

// config cors
// configCors(app);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie-parser
app.use(cookieParser());

//test connection
connection_DB();

// config routes
initWebRoutes(app);
initApiRoutes(app);
initClientRoutes(app);

// Khi có kết nối socket.io từ client
io.on("connection", (socket) => {
  console.log("Client connected");

  // Khi client ngắt kết nối socket.io
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.listen(PORT, () => {
  console.log("OKE ROI NHE PORT " + PORT);
});
