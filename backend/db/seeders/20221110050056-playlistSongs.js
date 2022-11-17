'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('PlaylistSongs', [{
      id: 1,
      songId: 1,
      playlistId: 1
    },
    {
      id: 2,
      songId: 2,
      playlistId: 2
    }
  ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('PlaylistSongs', null, {});

  }
};
