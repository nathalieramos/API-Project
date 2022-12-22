'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    await queryInterface.bulkInsert(options, [{
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
    options.tableName = 'Comments';
     await queryInterface.bulkDelete(options, null, {}); // instead of comments it said 'People' not sure if line 26 is correct
     
  }
};
