'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkInsert(options, [{
      id: 1,
      albumId: 1,
      userId: 1,
      title: "La Neverita",
      previewImage: 'image1',
      url: "",
      description: "A song about a summer"
    },
    {
      id: 2,
      albumId: 2,
      userId: 2,
      title: "Hasta que me olvides",
      previewImage: 'image3',
      description: "A classic Mexican song" 
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});

  }
};
