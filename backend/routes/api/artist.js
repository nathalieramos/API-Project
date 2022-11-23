const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//get all albums of an artist by id
router.get('/:userId/albums', async (req, res) => {

    const { userId } = req.params;

    const artist = await User.findOne({
        where: {
            id: userId
        }
    })
    if (!artist) {
        return res.status(404).json({
            'message': "Artist couldn't be found",
            'statusCode': 404
        })
    }
    const albums = await Album.findAll({
        where: {
            userId
        },
    });
    res.json({Albums:albums})
});



module.exports = router;
