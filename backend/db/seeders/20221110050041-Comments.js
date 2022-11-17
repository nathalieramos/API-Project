'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Comments', [{
      id: 1,
      songId: 1,
      userId: 1,
      body: 'Great song!',
    },
  {
    id: 2,
    songId: 2,
    userId: 2,
    body: 'Oldie but goodie!',
  }], {});

  },

  async down(queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('People', null, {});
     
  }
};
