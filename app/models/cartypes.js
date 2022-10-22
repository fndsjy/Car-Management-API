'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class carTypes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.carTypes.hasMany(models.Cars, {
                foreignKey: 'carType',
                as: 'car_type',
            });
        }
    }
    carTypes.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'carTypes',
        }
    );
    return carTypes;
};
