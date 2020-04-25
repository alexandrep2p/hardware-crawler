const connection = require('../connection');
const Sequelize = require('sequelize');

let product = connection.connect.define('products', {
    name: Sequelize.STRING,
    price: Sequelize.STRING,
    seller: Sequelize.STRING,
});

let newProducts = function(products) {
    products.forEach(item => {
        connection.connect.sync().then(function() {
            product.create({
                name: item.name,
                price: item.price,
                seller: item.seller
            })
        });
    });
}

module.exports = { newProducts, product };