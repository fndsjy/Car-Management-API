'use strict';

/** @type {import('sequelize-cli').Migration} */
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
   await queryInterface.bulkInsert('cars', [{
    id: 1,
    user_id: 1,
    car_name: "Kijang",
    rent_cost: 100000000,
    car_size: "Small",
    car_image: "https://res.cloudinary.com/dd93u8fa5/image/upload/v1665242746/Challenge%20Chapter%205/l8lewhpuemfav3qfnlfr.png",
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    id: 2,
    user_id: 2,
    car_name: "Avanza",
    rent_cost: 250000000,
    car_size: "Medium",
    car_image: "https://res.cloudinary.com/dd93u8fa5/image/upload/v1665242746/Challenge%20Chapter%205/l8lewhpuemfav3qfnlfr.png",
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    id: 3,
    user_id: 3,
    car_name: "BMW",
    rent_cost: 400000000,
    car_size: "Large",
    car_image: "https://res.cloudinary.com/dd93u8fa5/image/upload/v1665242746/Challenge%20Chapter%205/l8lewhpuemfav3qfnlfr.png",
    createdAt: new Date(),
    updatedAt: new Date()
   },
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
