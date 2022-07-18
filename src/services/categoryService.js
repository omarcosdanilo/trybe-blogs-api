const throwError = require('../utils/throwError');
const { Category } = require('../database/models');

const categoryService = {
  async add(name) {
    const category = await Category.create({ name }, { raw: true });

    return category;
  },

  async getAll() {
    const categories = await Category.findAll({ raw: true });

    return categories;
  },

  async validateName(name) {
    if (!name) throwError(400, '"name" is required');

    return true;
  },
 
};

module.exports = categoryService;