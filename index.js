const pichau = require('./crawlers/Pichau');
const terabyte = require('./crawlers/Terabyte');

pichau.findAndSave('https://www.pichau.com.br/hardware/memorias?product_list_order=price&tipo_de_memoria=422');
terabyte.findAndSave('https://www.terabyteshop.com.br/hardware/memorias/ddr4');