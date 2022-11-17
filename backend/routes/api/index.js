const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const playlistsongsRouter = require('./playlistsongs.js');
const commentsRouter = require('./comments.js');
const playlistsRouter = require('./playlists.js');
const albumsRouter = require('./albums.js');
const { restoreUser } = require('../../utils/auth.js');


router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/playlistsongs', playlistsongsRouter);
router.use('/comments', commentsRouter);
router.use('/playlists', playlistsRouter);
router.use('/albums', albumsRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });



module.exports = router;
