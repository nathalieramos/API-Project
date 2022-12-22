'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkInsert(options, [{
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
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkDelete(options, null, {});

  }
};
