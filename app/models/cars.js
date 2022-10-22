'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Cars.belongsTo(models.carTypes, {
                foreignKey: 'carType',
                as: 'type',
                onDelete: 'CASCADE',
            });
        }
    }
    Cars.init(
        {
            carName: DataTypes.STRING,
            rentCost: DataTypes.INTEGER,
            carImage: DataTypes.STRING,
            carType: DataTypes.INTEGER,
            createdBy: DataTypes.STRING,
            updatedBy: DataTypes.STRING,
            deletedBy: DataTypes.STRING,
        },
        {
            sequelize,
            paranoid: true,
            modelName: 'Cars',
        }
    );
    return Cars;
};
