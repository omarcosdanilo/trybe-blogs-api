const categoryService = require('../services/categoryService');

const categoryController = {
  async add(req, res, next) {
    try {
      const { name } = req.body;

      await categoryService.validateName(name);
      const category = await categoryService.add(name);

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;