const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("foodShop", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const connection_DB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection_DB;
