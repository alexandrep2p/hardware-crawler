const request = require('request');
const cheerio = require('cheerio');
const Product = require('../models/Product');
const DaoProducts = require('../dao/Products');

let Products = [];

let findAndSave = function(url) {
    request(url, function(err, res, body) {
        let $ = cheerio.load(body);
        $('#prodarea div').each(function() {
            $(this).find('.commerce_columns_item_inner').each(function() {
                let name = $(this).find('.prod-name h2 strong').text().trim();
                let price = $(this).find('.commerce_columns_item_info .prod-new-price span').text().trim();
                if (price) {
                    let indexPrice = price.indexOf('$');
                    let indexPriceComma = price.indexOf(',');
                    price = (price.substring((indexPrice + 1), (indexPriceComma + 3)));
                    let product = new Product(
                        name,
                        price.replace(",", "."),
                        'Terabyte');
                    Products.push(product);
                }
            });
        });
        DaoProducts.newProducts(Products);
    });
}

module.exports = { findAndSave };