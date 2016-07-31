//var db = require('../model/index.js');
//var models = require("../model");
var options = {}; //options are empty
var pgp = require('pg-promise')(options);
var db = pgp('postgress://userN:p_word@localhost:5432/mydb');


//Function that adds a user to the postgres database
//uses sql query language instead of sequelize now
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

/*function to find users
This is used to login to smart garden*/
getUser = function(email, done) {
    var query = "SELECT * FROM users " +
              "WHERE email = '"+ email +"';";

   db.any(query)
    .then(function (data) {
      console.log(data);
      if (data.length > 0)
        done(data[0], true);
      else
        done(null, false);
    })
    .catch(function (error) {
      console.log(error);
      done(null, false);
    });
}




/*function to get the current day so that it can be used for 
the registration date field */	
function today() {
		var d = new Date();
		var n = d.getDate();
		var g = d.getMonth() + 1;
		var y = d.getFullYear();
		var day = g+"-"+n+"-"+y;
		return day;
}



module.exports = {
	addUser: addUser,
	getUser: getUser
}