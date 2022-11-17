
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Song, User, Album } = require('../../db/models');

const router = express.Router();



//create an album
router.post('/', requireAuth , async(req, res) => {
    const { title, description, imageUrl } = req.body;

    const createAlbum = await Album.create({
        userId: User.id,
        title,
        description,
        imageUrl,
    });

    return res.json(createAlbum)
});















module.exports = router
