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
        onDelete: 'CASCADE'
      });
      Album.belongsTo(models.User, {
        as: 'Artist',
        foreignKey: "userId",
        onDelete: 'CASCADE'
      });
    }
  };

  Album.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
    scopes: {
      includeArtist: {
        attributes: {
          exclude: ['description', 'userId', 'createdAt', 'updatedAt']
        }
      }
    }
  });
  return Album;
};
