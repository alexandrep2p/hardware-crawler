const request = require('request');
const cheerio = require('cheerio');

let pichau = [];

request('https://www.pichau.com.br/hardware/memorias?product_list_order=price&tipo_de_memoria=422', function(err, res, body) {
    let $ = cheerio.load(body);

    $('.product-items li').each(function() {
        $(this).find('.product-item .product-item-info').each(function() {
            let product = $(this).find('.product-item-details .product-item-name a').text().trim();
            let price = $(this).find('.product-item-details .price-final_price .price-boleto span').text().trim();
            console.log(product + ' - ' + price);
        });
    });
});