'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Songs', [{
      id: 1,
      albumId: 1,
      userId: 1,
      title: "La Neverita",
      previewImage: 'image1',
      url: "",
      description: "A song about a summer rejection"
    },
    {
      id: 2,
      albumId: 2,
      userId: 2,
      title: "Hasta que me olvides",
      previewImage: 'image3',
      description: "A classic Mexican song about love" 
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', null, {});

  }
};
