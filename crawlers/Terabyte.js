const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const Product = require('../models/Product');

let Products = [];

let Terabyte = function(url) {
    request('https://www.terabyteshop.com.br/hardware/memorias/ddr4', function(err, res, body) {
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
                        price,
                        'Terabyte',
                        moment().format('DD/MM/YYYY'));
                    Products.push(product);
                }
            });
        });
        console.log(Products);
    });
}

module.exports = Terabyte;