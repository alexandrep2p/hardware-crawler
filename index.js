const pichau = require('./crawlers/Pichau');
const terabyte = require('./crawlers/Terabyte');
const productApi = require('./api/product');
const schedule = require('node-schedule');
const config = require('./config');

//Run API endpoints in port setted in config.js
productApi.app;

//Run crawlers every day at time setted in config.js
let rule = new schedule.RecurrenceRule();
rule.hour = config.environment.CRAWLER_HOUR;
rule.minute = config.environment.CRAWLER_MIN;
schedule.scheduleJob(rule, function() {
    pichau.findAndSave('https://www.pichau.com.br/hardware/memorias?product_list_order=price&tipo_de_memoria=422');
    terabyte.findAndSave('https://www.terabyteshop.com.br/hardware/memorias/ddr4');
});