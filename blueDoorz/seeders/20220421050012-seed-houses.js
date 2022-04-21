'use strict';
const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataHouse = JSON.parse(fs.readFileSync('./data/House.json', 'utf-8'))

    dataHouse.forEach((ele)=> {
      ele.createdAt = new Date()
      ele.updatedAt = new Date()
    })
    
    return queryInterface.bulkInsert("Houses", dataHouse, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Houses", null, {})
  }
};
