"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Food", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type_id: {
        type: Sequelize.STRING,
      },
      ItemImg: {
        type: Sequelize.STRING,
      },
      ItemName: {
        type: Sequelize.STRING,
      },
      ItemIngredients: {
        type: Sequelize.STRING,
      },
      ItemPrice: {
        type: Sequelize.STRING,
      },
      ItemPriceBefore: {
        type: Sequelize.STRING,
      },
      Category: {
        type: Sequelize.STRING,
      },
      sale: {
        type: Sequelize.BOOLEAN,
      },
      Attributes: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Food");
  },
};
