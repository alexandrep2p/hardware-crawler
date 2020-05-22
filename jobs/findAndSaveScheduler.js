const pichau = require('../services/Pichau');
const terabyte = require('../services/Terabyte');
const kabum = require('../services/Kabum');
const productApi = require('../api/product');
const schedule = require('node-schedule');
const config = require('../config/config');


productApi.app;

let rule = new schedule.RecurrenceRule();
rule.hour = config.environment.CRAWLER_HOUR;
rule.minute = config.environment.CRAWLER_MIN;


schedule.scheduleJob(rule, function() {
    pichau.findAndSave('https://www.pichau.com.br/hardware/memorias?product_list_order=price&tipo_de_memoria=422');
    terabyte.findAndSave('https://www.terabyteshop.com.br/hardware/memorias/ddr4');
    kabum.findAndSave('https://www.kabum.com.br/hardware/memoria-ram/ddr-4?pagina=1&ordem=3&limite=200');
});