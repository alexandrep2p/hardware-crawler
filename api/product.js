const express = require('express');
const { Op } = require('sequelize');
const app = express();
const daoProducts = require('../dao/Products');

app.use(express.urlencoded({ extended: false }));
app.get('/products', (req, res) => {
    daoProducts.product
        .findAll()
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