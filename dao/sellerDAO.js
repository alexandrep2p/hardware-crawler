const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../config/connection');
const app = express();
const daoProducts = require('./Products');
const config = require('../config/config');


function getAllSellers(){
    return daoProducts.product
        .aggregate('seller', 'DISTINCT', { plain: false })
        .then((result) => res.json(result));
}

function getProductsBySeller(sellerName){
    return sequelize.connect.query("SELECT DISTINCT name from products where seller = '" + sellerName + "'", { type: QueryTypes.SELECT })
    .then(function(products) {
        res.json(products);
    });
}