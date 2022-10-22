'use strict';
const { encryptPassword } = require('../../app/services/userServices');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                userName: 'fndsjy',
                email: 'fendysanjaya40@gmail.com',
                password: await encryptPassword('fendy123'),
                role: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
