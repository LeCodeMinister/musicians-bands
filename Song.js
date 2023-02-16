const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('./db');

let Song = sequelize.define("Song", {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
});

module.exports = {
    Song
};