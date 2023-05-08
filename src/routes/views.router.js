const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/products.controller.js');

router.get('/', async (req, res) => {
    const products = await getProducts(req.query.limit);
    res.render('index', { products });
});

module.exports = router;