"use strict"


 

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false

        },
        lastname: {
            type:DataTypes.STRING,
            allowNull:false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-z0-9\_\-]+$/i,
            }
        },

         //password: {
            //type: DataTypes.STRING,
            //allowNull: false,
            
        //},
       
        email: {
            type:DataTypes.STRING,
            validate: {
                isEmail:true
            }
        }
    }, {
       tableName: 'users'
    });

    return User;
}