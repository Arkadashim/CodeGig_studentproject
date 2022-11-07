const { Sequelize } = require('sequelize');
module.exports = new Sequelize({
    database: 'codegig_studproject',
    username: 'postgres',
    password: 'rootroot',
    host: 'localhost',
    dialect: 'postgres'
});