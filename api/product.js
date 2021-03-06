const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../connection');
const app = express();
const daoProducts = require('../dao/Products');
const config = require('../config');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/products', (req, res) => {
    daoProducts.product
        .aggregate('name', 'DISTINCT', { plain: false })
        .then((result) => res.json(result));
});

app.get('/sellers', (req, res) => {
    daoProducts.product
        .aggregate('seller', 'DISTINCT', { plain: false })
        .then((result) => res.json(result));
});

app.get('/products/seller/:sellerName', (req, res) => {
    const sellerName = req.params.sellerName;
    sequelize.connect.query("SELECT DISTINCT name from products where seller = '" + sellerName + "'", { type: QueryTypes.SELECT })
        .then(function(products) {
            res.json(products);
        });
});

app.get('/product/name/like/:productName', (req, res) => {
    const productName = req.params.productName;
    daoProducts.product
        .findAll({
            where: {
                name: {
                    [Op.like]: '%' + productName + '%'
                }
            }
        })
        .then((result) => res.json(result));
});

app.get('/product/productfromseller/:productName/:sellerName', (req, res) => {
    const productName = req.params.productName;
    const sellerName = req.params.sellerName;
    sequelize.connect.query("SELECT * FROM products p WHERE p.seller = '" + sellerName + "' AND p.name = '" + productName + "' ORDER BY p.createdAt ASC", { type: QueryTypes.SELECT })
        .then(function(products) {
            res.json(products);
        });
});

app.get('/product/productfromseller/:productName/:sellerName/:startDate/:endDate', (req, res) => {
    const productName = req.params.productName;
    const sellerName = req.params.sellerName;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    sequelize.connect.query("SELECT * FROM products p WHERE p.seller = '" + sellerName + "' AND p.name = '" + productName + "' AND p.createdAt BETWEEN '" + startDate + "' AND '" + endDate + "' ORDER BY p.createdAt ASC", { type: QueryTypes.SELECT })
        .then(function(products){
            res.json(products)
        });
});

app.listen(config.environment.API_LISTENER_PORT);

module.exports = { app };