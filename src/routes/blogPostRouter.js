const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, blogPostController.create);
router.get('/', validateToken, blogPostController.getAll);
router.get('/:id', validateToken, blogPostController.getById);

module.exports = router;