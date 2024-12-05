
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.post('/create', categoryController.createCategory);
router.get('/getall', categoryController.getAllCategories);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);
module.exports = router;