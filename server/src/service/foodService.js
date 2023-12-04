import db from "../models/index";

const getFoodList = async () => {
  try {
    let foods = await db.Food.findAll({
      order: [["id", "DESC"]],
    });
    if (foods) {
      //   let data = Foods.get({ plain: true });
      return {
        EM: "Get food data success",
        EC: 0,
        DT: foods,
      };
    } else {
      return {
        EM: "Get food data success",
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

const getFoodByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Food.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      foods: rows,
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

const getFoodByName = async (name) => {
  try {
    let food = {};
    food = await db.Food.findOne({
      where: {
        ItemName: name,
      },
    });
    return food.get({ plain: true });
  } catch (err) {
    console.log("Error: ", err);
    return {
      EM: "Error in service",
      EC: -2,
      DT: [],
    };
  }
};

const updateFoodById = async (data) => {
  try {
    let food = await db.Food.findOne({
      where: {
        id: data.id,
      },
    });
    if (food) {
      await db.Food.update(
        {
          type_id: data.type_id,
          ItemImg: data.ItemImg,
          ItemName: data.ItemName,
          ItemIngredients: data.ItemIngredients,
          ItemPrice: data.ItemPrice,
          ItemPriceBefore: data.ItemPriceBefore,
          Category: data.Category,
          sale: data.sale,
          attributes: data.attributes,
        },
        {
          where: {
            id: data.id,
          },
        }
      );

      return {
        EM: "Update food success",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Food not found",
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

const deleteFoodById = async (id) => {
  try {
    let food = await db.Food.findOne({
      where: {
        id: id,
      },
    });
    if (food) {
      await food.destroy();

      return {
        EM: "Delete food success",
        EC: -2,
        DT: food,
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
  getFoodList,
  deleteFoodById,
  getFoodByName,
  updateFoodById,
  getFoodByPagination,
};
