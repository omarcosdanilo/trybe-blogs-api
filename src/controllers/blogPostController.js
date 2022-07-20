const blogPostService = require('../services/blogPostService');

const blogPostController = {  
  async create(req, res, next) {
    try {
      await blogPostService.validateFields(req.body);
      await blogPostService.validateCategories(req.body.categoryIds);
      const post = await blogPostService.create(req.body, req.user);

      res.status(201).json(post);
    } catch (error) {
     next(error); 
    }
  },

  async getAll(req, res, next) {
    try {
      const posts = await blogPostService.getAll();
  
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      await blogPostService.exists(id);
      const post = await blogPostService.getBydId(id);

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;

      await blogPostService.validateUpdateFields(req.body);
      const post = await blogPostService.getBydId(id);
      await blogPostService.validateUser(req.user, post);
      await blogPostService.update(post, req.body);
      const updated = await blogPostService.getBydId(id);

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = blogPostController;