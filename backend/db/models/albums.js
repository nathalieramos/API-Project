'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.hasMany(models.Song, {
        foreignKey: "albumId",
        onDelete: 'CASCADE',
        hooks: true
      });
      Album.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: 'CASCADE'
      });
    }
  };

  Album.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
    scopes: {
      albumScope: {
        attributes: {
          exclude: ['description', 'userId', 'createdAt', 'updatedAt']
        }
      }
    }
  });
  return Album;
};
