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
};

module.exports = blogPostController;