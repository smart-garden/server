var db = require('../model/index.js');
var models = require("../model");

addUser = function(firstname, lastname, username, email, done) {
	models.sequelize.sync().then(function() {
		db.User.create({
			firstname:firstname,
			lastname: lastname,
			username: username,
			email: email
		}).then(function(data) {
			console.log(data);
			done(data, true);
		});
	});
}




module.exports = {
	addUser: addUser
}