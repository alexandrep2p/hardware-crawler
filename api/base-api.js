const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');
const app = express();
const daoProducts = require('../dao/Products');
const productDAO = require('../dao/productDAO');
const sellerDAO = require('../dao/sellerDAO');
const config = require('../config/config');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/products', (req, res) => {
    res.json(productDAO.getAllProducts());
});

app.get('/sellers', (req, res) => {
    res.json(sellerDAO.getAllSellers());
});

app.get('/products/seller/:sellerName', (req, res) => {
    const sellerName = req.params.sellerName;
    res.json(sellerDAO.getProductsBySeller(sellerName));
});

app.get('/product/name/like/:productName', (req, res) => {
    const productName = req.params.productName; 
    res.json(productDAO.getProductByName(productName));
});

app.get('/product/productfromseller/:productName/:sellerName', (req, res) => {
    const productName = req.params.productName;
    const sellerName = req.params.sellerName;
    res.json(getProductsFromSeller(productName,sellerName));
});

app.listen(config.environment.API_LISTENER_PORT);

module.exports = { app };