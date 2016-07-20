"use strict"


 

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-z0-9\_\-]+$/i,
            }
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type:DataTypes.STRING,
            validate: {
                isEmail:true
            }
        }
    }, {
       tableName: 'Tasks'
    });

    return User;
}