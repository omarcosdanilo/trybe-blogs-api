const { Op } = require('sequelize');
const { Category, BlogPost, PostCategory: postCategory, User } = require('../database/models');
const throwError = require('../utils/throwError');

const blogPostService = {
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

  async exists(id) {
    const post = await BlogPost.findOne({ 
      where: { id },
      raw: true,
    });

    if (!post) throwError(404, 'Post does not exist');
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

  async getBydId(id) {
    const data = await BlogPost.findOne({
      where: { id },
      include: [{
        model: User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    
    return data;
  },

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

  async validateUpdateFields(payload) {
    const { title, content } = payload;

    if (!title || !content) throwError(400, 'Some required fields are missing');

    return true;
  },

  async validateUser(reqUser, post) {
    const { userId } = post.toJSON();
    const { id } = reqUser;

    if (id !== userId) throwError(401, 'Unauthorized user');
    
    return true;
  },

  async update(post, { title, content }) {
    const { id } = post.toJSON();

    await BlogPost.update({ title, content }, {
      where: { id },
    });
  },
};

module.exports = blogPostService;
