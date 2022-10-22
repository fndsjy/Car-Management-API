'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            carName: {
                type: Sequelize.STRING,
            },
            rentCost: {
                type: Sequelize.INTEGER,
            },
            carImage: {
                type: Sequelize.STRING,
            },
            carType: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'carTypes',
                    key: 'id',
                },
            },
            createdBy: {
                type: Sequelize.STRING,
            },
            updatedBy: {
                type: Sequelize.STRING,
            },
            deletedBy: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Cars');
    },
};
