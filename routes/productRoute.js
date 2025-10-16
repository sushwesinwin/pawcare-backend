const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a product
router.post('/', productController.addProduct);
// Get all products
router.get('/', productController.getProducts);
// Get a single product
router.get('/:id', productController.getProduct);
// Update a product
router.put('/:id', productController.updateProduct);
// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;


