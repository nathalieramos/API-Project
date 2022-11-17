const express = require("express");
const {
    User, Song, Album, Playlist, Comment
} = require('../../db/models')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const validateSong = [
    check('title')
        .exists({ checkFalsey: true })
        .withMessage('Song title is required.'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required'),
    handleValidationErrors
];

const noAlbum = (next) => {
    const e = new Error();
    e.message = "Album couldn't be found";
    e.status = 404;
    next(e)
}

//get all songs
router.get('/', async(req, res)=> {
   const songs = await Song.findAll()
   res.json(songs)
});
 
//create a song based on albumId
router.post('/', requireAuth, validateSong, async(req, res, next) => {
    const { title, description, url, imageUrl, albumId } = req.body;

    const album = await Album.findOne({
        where: {
            id: albumId
        }
    });
    console.log(album);

    if(album){
        const newSong = await Song.create({
            userId: User.id,
            albumId,
            title,
            description,
            url,
            imageUrl           
        })
        return res.json(newSong) 
    }  else {
        const e = new Error();
    e.message = "Album couldn't be found";
    e.status = 404;
    return next(e)
    }
});


//get all songs created by current user
router.get('/current', requireAuth, async(req, res)=> {
    const userId = req.user.id

    const songs = await Song.findAll({ 
    where: {
       userId
    }
}); 
     res.json(songs)
 });


 module.exports = router;
