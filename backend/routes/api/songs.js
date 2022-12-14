const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');



const validateQuery = [
    check('size')
        .custom(async (value, { req }) => {
            if (req.query) {
                const { size } = req.query
                if (size < 0) {
                    return await Promise.reject("Size must be greater than or equal to 0")
                }
            }
        }),
    check('page')
        .custom(async (value, { req }) => {
            if (req.query) {
                const { page } = req.query
                if (page < 0) {
                    return await Promise.reject("Page must be greater than or equal to 0")
                }
            }
        }),
    check('createdAt')
        .isDate({ dateOnly: false })
        .optional({ nullable: true })
        .withMessage("CreatedAt is invalid"),
    handleValidationErrors
];

const validateSong = [
    check('title')
        .exists({ checkFalsey: true })
        .withMessage('Song title is required.'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required'),
    handleValidationErrors
];


const validateComment = [
    check('body')
        .exists({ checkFalsey: true })
        .withMessage('Comment body text is required'),
    handleValidationErrors
];



//get all songs
router.get('/', validateQuery, async (req, res) => {

    const queryObj = req.query;
    let { page, size } = queryObj;
    page = Number.parseInt(page)
    size = Number.parseInt(size)


    if (Number.isNaN(page)) page = 1;
    if (Number.isNaN(size)) size = 10;

    const pagination = {};

    if (page === 0) {
        limit = null;
        offset = null;
    }

    else {
        pagination.limit = size;

        pagination.offset = size * (page - 1)
    }

    const songs = await Song.findAll({

        ...pagination
    });

    res.json({
        songs,
        page,
        size
    });
});


//create a song based on albumId
router.post('/', requireAuth, validateSong, async (req, res, next) => {
    const { title, description, url, previewImage, albumId } = req.body;
    const userId = req.user.id;

    const album = await Album.findOne({
        where: {
            id: albumId
        }
    });
   

    if (album) {
        const newSong = await Song.create({
            userId,
            albumId,
            title,
            description,
            url,
            previewImage
        })
        return res.json(newSong)
    } else {
        const e = new Error();
        e.message = "Album couldn't be found";
        e.status = 404;
        return next(e)
    }
});


//get all songs created by current user
router.get("/current", requireAuth, async (req, res) => {
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
            { model: User, as: 'Artist', attributes: ['id', 'username', 'previewImage'] },
            { model: Album, attributes: ['id', 'title', 'previewImage'] },
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
        await song.update({ ...req.body });
        return res.json(song)
    } else {
        const e = new Error();
        e.message = "Song couldn't be found.";
        e.status = 404;
        next(e);
    }
});

//create comment by a song's id

router.post('/:songId/comments', validateComment, async (req, res, next) => {
    const userId = req.user.id;
    const { songId } = req.params;
    const { body } = req.body;

    let findSongId = await Song.findByPk(songId);
    if (!findSongId) {
        const err = new Error();
        err.message = "Song couldn't be found";
        err.status = 404;
        return next(err);
    } else {
        const newComment = await Comment.create({
            userId,
            body,
            songId
        })
        return res.json(newComment)
    }
});

//get comments by songid

router.get('/:songId/comments', async (req, res) => {
    const {songId} = req.params
    const commentById = await Comment.scope([{method: ['songScopeComment', songId]}]).findAll(
       { include: [ { model: User }]
});

    if (commentById) {
      
      return res.json({"Comments": commentById})
    }
  });

//delete a song 
router.delete('/:songId', requireAuth, restoreUser, async (req, res) => {
    const { songId } = req.params;

    const byebye = await Song.findByPk(songId);
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
            'message': "Song couldn't be found",
            'statusCode': 404
        }));
    }
});








module.exports = router;
