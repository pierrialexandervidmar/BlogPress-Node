const Sequelize = require('sequelize');

const connection = new Sequelize('blogpress', 'root', 'Senha@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;