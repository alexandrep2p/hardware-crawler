const request = require('request');
const cheerio = require('cheerio');
const Product = require('../models/product');
const DaoProducts = require('../dao/Products');

let Products = [];

let findAndSave = function(url) {
    request(url, function(err, res, body) {
        let $ = cheerio.load(body, { xmlMode: true });
        let dataFromSite = $('script:not([src])')[16].children[0].data;
        productsFromSite = JSON.parse(dataFromSite.match(/listagemDados = (\[.*?\])/)[1]);
        productsFromSite.forEach(product => {
            let rawname = (product.nome);
            let name = rawname.replace(/\uFFFD/g, "o");
            let price = (product.preco_desconto);
            if (price) {
                let product = new Product(
                    name,
                    price,
                    'Kabum');
                console.log(product)
                Products.push(product);
            }
        });
        DaoProducts.newProducts(Products);
    });
}

module.exports = { findAndSave };