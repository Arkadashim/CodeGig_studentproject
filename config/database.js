const { Sequelize } = require('sequelize');
const pg = require('pg');
module.exports = new Sequelize({
    database: 'codegig_studproject',
    username: 'postgres',
    password: 'rootroot',
    host: 'localhost',
    dialect: 'postgres',
    dialectModule: pg
});