const Sequelize = require('sequelize');

const DB_NAME = 'HWCRAWLER';
const DB_USER = 'root';
const DB_PASSWORD = 'dbpass10!';
const DB_ADDRESS = 'localhost';
const DB_PORT = '3306';

const connect = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_ADDRESS,
    dialect: 'mysql',
    port: DB_PORT
});

module.exports = { connect };