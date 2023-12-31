import { registerNewUser, handleUserLogin } from "../service/authenService";

const handlePrint = (req, res) => {
  return res.send("BDH");
};

const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.phone ||
      !req.body.fullName ||
      !req.body.address
    ) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1", // -1, 1, -2 -> error, 0 -> success,
        DT: "",
      });
    }

    if (req.body.password && req.body.password.length < 6) {
      return res.status(200).json({
        EM: "Your password must have more than 6 letters",
        EC: "1", // -1, 1, -2 -> error, 0 -> success,
        DT: "",
      });
    }

    let data = await registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // -1 -> error, 0 -> success,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await handleUserLogin(req.body);

    if (data && data.DT && data.DT.access_token) {
      // set cookie
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // -1 -> error, 0 -> success,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout success",
      EC: 0, // -1 -> error, 0 -> success,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};
module.exports = {
  handlePrint,
  handleRegister,
  handleLogin,
  handleLogout,
};
