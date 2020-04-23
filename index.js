const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const Product = require('./model/product');

let Products = [];

request('https://www.pichau.com.br/hardware/memorias?product_list_order=price&tipo_de_memoria=422', function(err, res, body) {
    let $ = cheerio.load(body);

    $('.product-items li').each(function() {
        $(this).find('.product-item .product-item-info').each(function() {
            let name = $(this).find('.product-item-details .product-item-name a').text().trim();
            let price = $(this).find('.product-item-details .price-final_price .price-boleto span').text().trim();
            let product = new Product(
                name,
                price,
                'Pichau',
                moment().format('DD/MM/YYYY'));
            Products.push(product);
        });
    });
    console.log(Products);
});