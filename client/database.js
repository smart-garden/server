//var db = require('../model/index.js');
//var models = require("../model");
var options = {};
var pgp = require('pg-promise')(options);
var db = pgp('postgress://userN:p_word@localhost:5432/mydb');


addUser = function(firstname, lastname, email, username, pass, done ) {
	var date = today(); 
	var query = "INSERT INTO users" + "(firstname, lastname, email, username, pass, reg_date)" +
	"VALUES ('"
				 	+ firstname + "', '"
				 	+ lastname + "', '" 
				 	+ email + "', '"
				 	+ username + "', '"
				 	+ pass + "', '"		
				 	+ date + "')"
	+ "RETURNING id;";
	db.any(query)
	.then(function(data) {
		console.log(data);
		done(data, true);
	})
	.catch(function(error) {
		console.log(error);
		done(null, false);
	})  
}
	
function today() {
		var d = new Date();
		var n = d.getDate();
		var g = d.getMonth() + 1;
		var y = d.getFullYear();
		var day = g+"-"+n+"-"+y;
		return day;
}



module.exports = {
	addUser: addUser
}