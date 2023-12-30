import db from "../models/index";

const getUserList = async () => {
  // User -> group -> role
  // let data = await db.User.findAll({
  //   where: { id: 1 },
  //   include: [
  //     {
  //       model: db.Group,
  //       include: [db.Role],
  //     },
  //   ],
  // });
  // return data;

  try {
    let users = await db.User.findAll({
      attributes: [
        "id",
        "fullName",
        "email",
        "age",
        "address",
        "gender",
        "phone",
      ],
      include: [
        {
          model: db.Group,
          attributes: ["id", "name", "description"],
        },
      ],
      order: [["id", "DESC"]],
    });
    if (users) {
      //   let data = users.get({ plain: true });
      return {
        EM: "Get user data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get user data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const getUserByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      attributes: [
        "id",
        "fullName",
        "email",
        "age",
        "address",
        "gender",
        "phone",
      ],
      include: [
        {
          model: db.Group,
          attributes: ["id", "name", "description"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Success with get by pagination",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const getUserById = async (id) => {
  try {
    let user = {};
    user = await db.User.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "fullName",
        "email",
        "age",
        "address",
        "gender",
        "phone",
      ],
    });
    return {
      EM: "Success with get by pagination",
      EC: 0,
      DT: user,
    };
    // return user.get({ plain: true });
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const updateUserById = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      await db.User.update(
        {
          fullName: data.fullName,
          age: data.age,
          address: data.address,
          gender: data.gender,
          phone: data.phone,
        },
        {
          where: {
            id: data.id,
          },
        }
      );

      return {
        EM: "Update user success",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found",
        EC: -1,
        DT: "",
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const deleteUserById = async (id) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      await user.destroy();

      return {
        EM: "Delete user success",
        EC: -2,
        DT: user,
      };
    }
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getUserList,
  deleteUserById,
  getUserById,
  updateUserById,
  getUserByPagination,
};
