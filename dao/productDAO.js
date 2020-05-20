const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');
const app = express();
const daoProducts = require('./Products');
const config = require('../config/config');


function getAllProducts(){
    return daoProducts.product
        .aggregate('name', 'DISTINCT', { plain: false })
        .then((result) => res.json(result));
}


function getProductByName(productName){
    return daoProducts.product
    .findAll({
        where: {
            name: {
                [Op.like]: '%' + productName + '%'
            }
        }
    })
    .then((result) => res.json(result));
}

function getProductsFromSeller(productName,sellerName){
    return sequelize.connect.query("SELECT * FROM products p WHERE p.seller = '" + sellerName + "' AND p.name = '" + productName + "' ORDER BY p.createdAt ASC", { type: QueryTypes.SELECT })
    .then(function(products) {
        res.json(products);
    });

}