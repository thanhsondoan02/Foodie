import {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
} from "../service/userService";

const handleHelloHien = (req, res) => {
  return res.render("home.ejs");
};

const handleUser = async (req, res) => {
  let usersList = await getUserList();
  // return res.json(usersList);
  console.log("List users: ", usersList);
  return res.render("user.ejs", { usersList });
};

const addUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  await createNewUser(email, password, username);
  return res.redirect("/users");
};

const handleDeleteUser = async (req, res) => {
  await deleteUser(req.params.id);
  return res.redirect("/users");
};

const getUserFromId = async (req, res) => {
  let user = await getUserById(req.params.id);
  let userData = {};
  console.log(">>>>>>>>>>>>check user: ", user);
  userData = user;
  res.render("update_user.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await updateUser(email, username, id);
  return res.redirect("/users");
};

module.exports = {
  handleHelloHien,
  handleUser,
  addUser,
  handleDeleteUser,
  handleUpdateUser,
  getUserFromId,
};
