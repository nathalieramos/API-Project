'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    await queryInterface.bulkInsert(options, [{
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
    options.tableName = 'Playlists';
    await queryInterface.bulkDelete(options, null, {});

  }
};
