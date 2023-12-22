'use strict';

// const { JSON } = require("sequelize");

const fs = require("fs").promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let trips  = JSON.parse(await fs.readFile('./data/trip.json','utf-8') )
    trips.forEach(el => {
      el.createdAt = el.updatedAt =new Date()
    });

    await queryInterface.bulkInsert('Trips' , trips)
    // console.log(trips);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Trips', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
