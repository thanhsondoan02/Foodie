"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "hien1@gmail.com",
          password: "hiendepzai",
          username: "Hien1",
        },
        {
          email: "hien2@gmail.com",
          password: "hiendepzai",
          username: "Hien2",
        },
        {
          email: "hien3@gmail.com",
          password: "hiendepzai",
          username: "Hien3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
