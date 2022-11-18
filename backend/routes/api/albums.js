const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');


//create an album
router.post('/', requireAuth, async(req, res) => {
    const { title, description, imageUrl } = req.body;
    const userId = req.user.id;

    const createAlbum = await Album.create({
        userId,
        title,
        description,
        imageUrl,
    });

    return res.json(createAlbum)
});

//get all albums
router.get('/', async (req, res) =>{
    const albums = await Album.findAll()
    res.json({Albums: albums})
  })

// get all albums of current user
router.get('/current', requireAuth, async (req, res) => {
    const myAlbums = await Album.findAll({
      where: { userId: req.user.id },
    });
    return res.json(myAlbums)
});














module.exports = router;
