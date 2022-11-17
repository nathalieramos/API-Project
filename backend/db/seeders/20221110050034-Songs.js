'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Songs', [{
      id: 1,
      albumId: 1,
      userId: 1,
      title: "La Neverita",
      imageUrl: 'https://i1.sndcdn.com/artworks-kGlnygiMbJDb-0-t500x500.jpg',
      url: "",
      description: "A song about a summer rejection"
    },
    {
      id: 2,
      albumId: 2,
      userId: 2,
      title: "Hasta que me olvides",
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e5f098d592c28ed04867b918',
      url: "",
      description: "A classic Mexican song about love" 
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', null, {});

  }
};
