'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistSong,
        foreignKey: 'songId'
      });
      Song.belongsTo(models.Album, {
        foreignKey: "albumId"
      });
      Song.belongsTo(models.User, {
        as: 'Artist',
        foreignKey: "userId"
      });
      Song.hasMany(models.PlaylistSong, {
        foreignKey: 'songId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    previewImage: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
