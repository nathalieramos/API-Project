const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
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
    const { name, imageUrl} = req.body;
    const { user } = req;

    const createPlaylist = await Playlist.create({
        userId: user.id,
        name,
        previewImage: imageUrl
    });

    return res.json(createPlaylist)
});











module.exports = router
