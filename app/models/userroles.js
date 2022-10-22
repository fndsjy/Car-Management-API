'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userRoles extends Model {
        static associate(models) {
            // define association here
            models.userRoles.hasMany(models.Users, {
                foreignKey: 'role',
                as: 'userRole',
            });
        }
    }
    userRoles.init(
        {
            roleName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'userRoles',
        }
    );
    return userRoles;
};
