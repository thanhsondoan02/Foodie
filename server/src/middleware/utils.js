import jwt, { decode } from "jsonwebtoken";
// require("dotenv").config();
// require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "/../../config.env" });

const nonSecurePaths = [
  "/register",
  "/login",
  "/logout",
  "/food/getAll",
  "/food/category",
  "/food/search",
];

// Create token
const createToken = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (err) {
    console.log(err);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decode = null;
  //   jwt.verify(token, key, function (err, decoded) {
  //     if (err) {
  //       console.log(err);
  //       return data;
  //     }
  //     console.log(">>>>>>>>> data:", decoded);
  //     return decoded;
  //   });
  try {
    decode = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decode;
};

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  let tokenFromHeaders = extractToken(req);

  if ((cookies && cookies.jwt) || tokenFromHeaders) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeaders;

    // validate toke
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EM: "User not authentication",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "User not authentication",
      EC: -1,
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/user/read")
    return next();
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentURL = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "You don't have permission to access this resources ...",
        EC: -1,
        DT: "",
      });
    }

    // check access
    let canAccess = roles.some((item) => item.url === currentURL);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EM: "You don't have permission to access this resources ...",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "User not authentication",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
