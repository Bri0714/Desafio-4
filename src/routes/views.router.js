const express = require('express');
const router = express.Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../models/products.model.js');

router.get('/', async (req, res) => {
    const products = getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = getProducts();
    res.render('realtimeproducts', { products });
});

module.exports = router;