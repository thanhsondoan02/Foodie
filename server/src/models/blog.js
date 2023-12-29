"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Blog.init(
    {
      img: DataTypes.STRING,
      name: DataTypes.STRING,
      intro: DataTypes.STRING,
      date: DataTypes.STRING,
      author: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Blog",
      timestamps: false,
    }
  );
  return Blog;
};
