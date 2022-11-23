'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Playlists', [{
      id: 1,
      userId: 1,
      name: "Reggaeton",
      previewImage: 'image 2',
    },
    {
      id: 2,
      userId: 2,
      name: "Mexican Classics",
      previewImage: 'image 1'
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Playlists', null, {});

  }
};
