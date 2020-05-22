const request = require('request');
const cheerio = require('cheerio');
const Product = require('../models/product');
const DaoProducts = require('../dao/Products');

let Products = [];

let findAndSave = function(url) {
    request(url, function(err, res, body) {
        let $ = cheerio.load(body);
        $('.product-items li').each(function() {
            $(this).find('.product-item .product-item-info').each(function() {
                let name = $(this).find('.product-item-details .product-item-name a').text().trim();
                let price = $(this).find('.product-item-details .price-final_price .price-boleto span').text().trim();
                if (price) {
                    let indexPrice = price.indexOf('$');
                    let indexPriceComma = price.indexOf(',');
                    price = (price.substring((indexPrice + 1), (indexPriceComma + 3)));
                    let product = new Product(
                        name,
                        price.replace(",", "."),
                        'Pichau');
                    Products.push(product);
                }
            });
        });
        DaoProducts.newProducts(Products);
    });
}

module.exports = { findAndSave };