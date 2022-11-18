const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, validationResult } = require('express-validator');
const { ValidationError } = require("sequelize");

const validateSong = [
    check('title')
        .exists({ checkFalsey: true })
        .withMessage('Song title is required.'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required'),
    handleValidationErrors
];

const songCouldNotBeFound = (next) => {
    const e = new Error();
    e.message = "Song couldn't be found.";
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
    const userId = req.user.id;

    const album = await Album.findOne({
        where: {
            id: albumId
        }
    });
    console.log(album);

    if(album){
        const newSong = await Song.create({
            userId,
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
router.get("/current",requireAuth, async (req, res) => {
    let userId = req.user.id;
    const songs = await Song.findAll({
      where: { userId },
    });
  
    return res.json(songs);
  });

 //get a song by id

 router.get("/:songId", async (req, res, next) => {
  
    const { songId } = req.params;
 
    const songById = await Song.findByPk(songId, {
      include: [
        { model: User, as: 'Artist', attributes: [ 'id', 'username'] },
        { model: Album, attributes: ['id', 'title', 'imageUrl']  },
      ],
    });
   if (!songById) {
     const err = new Error();
     err.message = "Song couldn't be found";
     err.status = 404;
     return next(err);
   }
   return res.json(songById);
 });
 
 //edit song

 router.put('/:songId', requireAuth, validateSong, async (req, res, next) => {
    const { songId } = req.params;

    const song = await Song.findByPk(songId);

    if (song) {
        await song.update({...req.body});
        return res.json(song)
    } else {
        songCouldNotBeFound(next);
    }
})



 module.exports = router;
