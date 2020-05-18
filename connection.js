const Sequelize = require('sequelize');
const config = require('./config');

const connect = new Sequelize(config.config.environmentironment.DB_NAME, config.environment.DB_USER, config.environment.DB_PASSWORD, {
    host: config.environment.DB_ADDRESS,
    dialect: 'mysql',
    port: config.environment.DB_PORT
});

module.exports = { connect };