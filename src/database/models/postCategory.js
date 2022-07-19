/** @type {import('sequelize').ModelAttributes} */
/** @param {import('sequelize').Sequelize} sequelize */

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: {
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'BlogPost',
        key: 'id'
      }
    }, 
    categoryId: {
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      }
    }, 
  },
  {
    timestamps: false
  });

  PostCategory.associate = (models) => {
   models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId'
   });

   models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId'
   });
  };

  return PostCategory;
};

module.exports = PostCategory;