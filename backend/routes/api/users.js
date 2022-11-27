const express = require('express');
const { Song, Album, Playlist } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid Email'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {

  const { firstName, lastName, email, password, username } = req.body;

  try {
    const user = await User.signup({ firstName, lastName, email, username, password });

    const token = setTokenCookie(res, user);

    return res.json({
      id: user.id, firstName, lastName, email, token
    })
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      for (const err of error.errors) {
        if (err.message === "email must be unique") {
          res.status(403)
          return res.json({
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
              "email": "User with that email already exists"
            }
          })
        }
        if (err.message === "username must be unique") {
          res.status(403)
          return res.json({
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
              "username": "User with that username already exists"
            }
          })
        }
      }

    }

    throw error
  }

});

//get details of an artist by id

router.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const songs = await Song.findAll({
    where: { userId },
    attributes: { include: ['previewImage'] }
  });
  const albums = await Album.count({ where: { userId } })
  const artistDets = await User.findByPk(userId);

  if (artistDets) {
    return res.json({
      "id": artistDets.id,
      "username": artistDets.username,
      "totalSongs": songs.length,
      "totalAlbums": albums,
      "imageUrl": artistDets.imageUrl,
      'songs': songs
    });
  } else {
    res.status(404)
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  }
});

//get all songs of an artist by id

router.get('/:userId/songs', async (req, res) => {

  const { userId } = req.params;

  const artistDets = await User.findByPk(userId);

  if (!artistDets) {
    return res.status(404).json({
      'message': "Artist couldn't be found",
      'statusCode': 404
    })
  }
  const artistSongs = await Song.findAll({ where: { userId: userId } });
  res.json({ Songs: artistSongs });
});
module.exports = router;

//get all playlist by user id

router.get("/:userId/playlists", async (req, res, next) => {

  const { userId } = req.params;

  const playlistById = await User.findByPk(userId);

  if (!playlistById) {
    const err = new Error();
    err.message = "Artist couldn't be found";
    err.status = 404;
    return next(err);
  } else {
    const Playlists = await playlistById.getPlaylists();
    return res.json({ Playlists });
  }
});
