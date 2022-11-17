'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Albums', [{
      id: 1,
      userId: 1,
      title: 'Un Verano Sin Ti',
      description: 'Summer album that released in 2022',
      imageUrl: 'https://www.billboard.com/wp-content/uploads/2022/05/bad-bunny-cover-art-2022-billboard-1240.jpg?w=1024'
    },
    {
      id: 2,
      userId: 2,
      title: 'Aries',
      description: 'Mexican Pop album that realeased in 1993',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/42/AriesLM.jpg'
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Albums', null, {});

  }
};
