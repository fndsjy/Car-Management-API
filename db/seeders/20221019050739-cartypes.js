'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('carTypes', [
            {
                name: 'Small',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Medium',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Large',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('carTypes', null, {});
    },
};
