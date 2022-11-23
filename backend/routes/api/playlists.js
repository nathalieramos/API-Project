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

//get all playlist by current user


router.get('/current', requireAuth, async (req, res) => {
    const myPlaylist = await Playlist.findAll({
        where: { userId: req.user.id },
    });
    return res.json(myPlaylist)
});

// //add a song to playlist

router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findOne({
        where: {
            userId: user.id,
            id: playlistId
        }
    });

    const song = await Song.findByPk(songId);

    if (playlist && song) {
        const newSong = await PlaylistSong.create({
            playlistId: playlist.id,
            songId: song.id
        });

        const playlistSong = await PlaylistSong.scope('addSongToPlaylist').findOne({
            where: {
                id: newSong.id
            }
        })

        return res.json(playlistSong)
    } else {
        if (!playlist) {
            res.status(404)
            res.json({
                "message": "Playlist couldn't be found",
                "statusCode": 404
            })
        }
        if (!song) {
            res.status(404)
            res.json({
                "message": "Song couldn't be found",
                "statusCode": 404
            })
        }
    }
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

//edit a playlist 
router.put('/:playlistId', requireAuth, validatePlaylist, async (req, res, next) => {
    const { playlistId } = req.params;

    const playlist = await Playlist.findByPk(playlistId);

    if (playlist) {
        await playlist.update({ ...req.body });
        return res.json(playlist)
    } else {
        const e = new Error();
        e.message = "Playlist couldn't be found";
        e.status = 404;
        return next(e)
    }
});

router.delete('/:playlistId', requireAuth, restoreUser, async (req, res) => {
    const { playlistId } = req.params;

    const byebye = await Playlist.findByPk(playlistId);
    if (byebye) {
        await byebye.destroy()
        res.status(200)
        res.json({
            'message': "Successfully deleted",
            'statusCode': 200
        });
    } else {
        res.status(404)
        res.json(res.json({
            'message': "Playlist couldn't be found",
            'statusCode': 404
        }));
    }
});










module.exports = router;
