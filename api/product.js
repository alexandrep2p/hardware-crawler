const express = require('express');
const { Op } = require('sequelize');
const app = express();
const daoProducts = require('../dao/Products');

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

app.get('/product/seller/:sellerName', (req, res) => {
    const sellerName = req.params.sellerName;
    daoProducts.product
        .findAll({
            where: {
                seller: {
                    [Op.like]: '%' + sellerName + '%'
                }
            }
        })
        .then((result) => res.json(result));
});

app.get('/product/productfromseller/:productName/:sellerName', (req, res) => {
    const productName = req.params.productName;
    const sellerName = req.params.sellerName;
    daoProducts.product
        .findAll({
            where: {
                seller: sellerName,
                name: {
                    [Op.like]: '%' + productName + '%'
                }
            }
        })
        .then((result) => res.json(result));
});

app.listen(3000);

module.exports = { app };