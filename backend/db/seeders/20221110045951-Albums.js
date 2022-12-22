'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName= 'Albums'
    await queryInterface.bulkInsert(options, [{
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
    options.tableName = 'Albums'
    await queryInterface.bulkDelete(options, null, {});

  }
};
