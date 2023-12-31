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

const app = express();
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

app.listen(PORT, () => {
  console.log("OKE ROI NHE PORT " + PORT);
});
