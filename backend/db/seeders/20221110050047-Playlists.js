'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Playlists', [{
      id: 1,
      userId: 1,
      name: "Reggaeton",
      imageUrl: 'https://i.pinimg.com/474x/d9/fa/be/d9fabe8750d55c4b0f27cdc0d1d3d862.jpg',
    },
    {
      id: 2,
      userId: 2,
      name: "Mexican Classics",
      imageUrl: 'https://blog.xcaret.com/en/wp-content/uploads/2020/04/blog-xoximilco-56-1.jpg'
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Playlists', null, {});

  }
};
