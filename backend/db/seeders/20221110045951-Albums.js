'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Albums', [{
      id: 1,
      userId: 1,
      title: 'Un Verano Sin Ti',
      description: 'Summer album that released',
      previewImage: 'image url'
    },
    {
      id: 2,
      userId: 2,
      title: 'Aries',
      description: 'Mexican Pop album that',
      previewImage: 'image url'
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Albums', null, {});

  }
};
