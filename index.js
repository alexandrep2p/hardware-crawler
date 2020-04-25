const pichau = require('./crawlers/Pichau');
const terabyte = require('./crawlers/Terabyte');
const kabum = require('./crawlers/Kabum');
const productApi = require('./api/product');
const schedule = require('node-schedule');

//Run product endpoint in 3000
productApi.app;

//Run crawlers every day at 08:30 AM
let rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 30;
schedule.scheduleJob(rule, function() {
    pichau.findAndSave('https://www.pichau.com.br/hardware/memorias?product_list_order=price&tipo_de_memoria=422');
    terabyte.findAndSave('https://www.terabyteshop.com.br/hardware/memorias/ddr4');
    //kabum.findAndSave('https://www.kabum.com.br/hardware/memoria-ram/ddr-4?pagina=1&ordem=3&limite=30&filtro=["1544"]');
});