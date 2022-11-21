const express = require("express");
const { User, Song, Album, PlaylistSong, Comment, Playlist } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require("sequelize");
const playlists = require("../../db/models/playlists");

const validatePlaylist = [
    check('name')
        .exists({ checkFalsey: true })
        .withMessage('Playlist name is required'),
    handleValidationErrors
];


//create a playlist

router.post('/', requireAuth, validatePlaylist, async (req, res) => {
    const { name, imageUrl } = req.body;
    const { user } = req;

    const createPlaylist = await Playlist.create({
        userId: user.id,
        name,
        previewImage: imageUrl
    });

    return res.json(createPlaylist)
});

// //add a song to playlist

router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const { songId } = req.body;
    const { playlistId } = req.params;

    if (!await Playlist.findByPk(playlistId)) {
        res.status(404)
        res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        })
    } ;
    if (!await Song.findOne({ songId })) {
        res.status(404)
        res.json({
            'message': "Song couldn't be found",
            'statusCode': 404
        });
    };

    await PlaylistSong.create({ songId, playlistId });
    const addTheSong = await PlaylistSong.scope('addSongToPlaylist').findOne({
        where: {
            songId: songId,
            playlistId: playlistId
        }
    })
    res.json(addTheSong)
});

//get details of a playlist by id

router.get('/:playlistId', async (req, res, next) => {
    const { playlistId } = req.params;

    const playlist = await Song.findByPk(playlistId);

    if (playlist) {
        const playlistDetails = await Playlist.findByPk(playlist.id);
        playlistDetails.dataValues.Song = playlist
        return res.json(playlistDetails)
    } else {
        const e = new Error();
        e.message = "Playlist couldn't be found";
        e.status = 404;
        return next(e)
    }
});
















module.exports = router;
