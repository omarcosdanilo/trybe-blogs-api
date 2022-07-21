/** @type {import('sequelize').ModelAttributes} */

const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });

  return Category;
};

module.exports = Category;