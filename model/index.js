' use strict';

var fs = require("fs");
var path = require("path");
var Sequelize = require ('sequelize');
//your user account and password for postgres
//todo: will change how this is done after routes are complete.
var sequelize = new Sequelize ('mydb', 'username','p_word', {
	host:'localhost',
	dialect: 'postgres',
	freezeTableName: true,

	pool: {
		max: 9,
		min: 0,
		idle: 10000
	}
});

sequelize.authenticate().then(function(err) {
	console.log("connection set");
})
.catch(function(err) {
	console.log('unable to connect');
});


var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;