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
};

module.exports = blogPostController;