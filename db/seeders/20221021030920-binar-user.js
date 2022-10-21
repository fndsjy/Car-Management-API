'use strict';
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcryptjs');

async function encryptedPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const superAdmin = "Superadmin";
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: "Fendy",
      email: "fendysanjaya@binarstudent.com",
      password: await encryptedPassword("fendy123"),
      role: superAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      name: "Harris",
      email: "harris@binarfacilitator.com",
      password: await encryptedPassword("harris123"),
      role: superAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      name: "Vinnie",
      email: "vinnie@binarstudent.com",
      password: await encryptedPassword("vinnie123"),
      role: superAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
