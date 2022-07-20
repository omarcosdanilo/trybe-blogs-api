const { Op } = require('sequelize');
const { Category, BlogPost, PostCategory: postCategory, User } = require('../database/models');
const throwError = require('../utils/throwError');

const blogPostService = {
  async validateCategories(categories) {
    const { count } = await Category.findAndCountAll({
      where: {
        id: {
          [Op.in]: categories,
        },
      },
      raw: true,
    });

    if (count === 0) throwError(400, '"categoryIds" not found');

    return true;
  },

  async validateFields(fields) {
    const { title, content, categoryIds } = fields;

    if (!title || !content || !categoryIds) throwError(400, 'Some required fields are missing');
  },

  async create(payload, user) {
    const { title, content, categoryIds } = payload;
    const { id: userId } = user;

    const post = await BlogPost.create({ 
      title, content, userId, published: new Date(), updated: new Date(),
    }, { raw: true });

    const { id } = post;

    await postCategory.bulkCreate([
      { postId: id, categoryId: categoryIds[0] },
      { postId: id, categoryId: categoryIds[1] },
    ], { fields: ['postId', 'categoryId'] });

    return post;
  },

  async getAll() {
    const data = await BlogPost.findAll({
      include: [{
        model: User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    
    return data;
  },
};

module.exports = blogPostService;
