const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require("sequelize");


const validateComment = [
    check('body')
        .exists({ checkFalsey: true })
        .withMessage('Comment body text is required'),
    handleValidationErrors
];

// edit a comment 

router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {
    const { commentId } = req.params;

    const editedComment = await Comment.findByPk(commentId);

    if (editedComment) {
        await editedComment.update({ ...req.body });
        return res.json(editedComment)
    } else {
        const e = new Error();
        e.message = "Comment couldn't be found";
        e.status = 404;
        next(e);
    }
})











module.exports = router
