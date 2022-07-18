const express = require('express');
const validateToken = require('../middlewares/validateToken');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validateToken, categoryController.add);

module.exports = router;