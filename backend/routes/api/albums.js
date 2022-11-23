const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const app = require('../../app');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require("sequelize");

const validateAlbum = [
    check('title')
        .exists({ checkFalsey: true })
        .withMessage('Album title is required.'),
    check('description')
        .exists({ checkFalsey: true })
        .withMessage('Album description is required.'),
    check('imageUrl')
        .exists({ checkFalsey: true })
        .withMessage('Album imageUrl is required.'),
    handleValidationErrors
];

//create an album
router.post('/', [requireAuth, validateAlbum], async (req, res, next) => {
    const { title, description, imageUrl } = req.body;
    const { user } = req;

    const createAlbum = await Album.create({
        userId: user.id,
        title,
        description,
        previewImage: imageUrl,
    });

    return res.json(createAlbum)
});

//get all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll()
    res.json({ Albums: albums })
})

// get all albums of current user
router.get('/current', requireAuth, async (req, res) => {
    const myAlbums = await Album.findAll({
        where: { userId: req.user.id },
    });
    return res.json(myAlbums)
});

//get details of an album by id
router.get('/:albumId', async (req, res, next) => {
    const { albumId } = req.params;


    const album = await Album.findByPk(albumId, {
        include: [
            { model: Song }
        ]
    });

    if (album) {
        const artist = await User.scope('includeArtist').findByPk(album.userId);
        album.dataValues.Artist = artist
        return res.json(album)
    } else {
        const e = new Error();
        e.message = "Album couldn't be found";
        e.status = 404;
        return next(e)
    }
});

//edit song
router.put('/:albumId', requireAuth, validateAlbum, async (req, res, next) => {
    const { albumId } = req.params;

    const album = await Album.findByPk(albumId);

    if (album) {
        await album.update({...req.body});
        return res.json(album)
    } else {
        const e = new Error();
        e.message = "Album couldn't be found";
        e.status = 404;
        return next(e)
    }
})

//delete an album
router.delete('/:albumId', requireAuth, restoreUser, async (req, res) => {
    const { albumId } = req.params;
    
    const byebye = await Album.findByPk(albumId);
    if(byebye){
        await byebye.destroy()
        res.status(200)
        res.json({
            'message': "Successfully deleted",
            'statusCode': 200
        });
    } else {
        res.status(404)
        res.json(res.json({
            'message': "Album couldn't be found",
            'statusCode': 404
        }));
    }
});


module.exports = router;
