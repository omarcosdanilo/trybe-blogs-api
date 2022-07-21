const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, blogPostController.create);
router.get('/', validateToken, blogPostController.getAll);
router.get('/:id', validateToken, blogPostController.getById);
router.put('/:id', validateToken, blogPostController.update);
router.delete('/:id', validateToken, blogPostController.delete);

module.exports = router;