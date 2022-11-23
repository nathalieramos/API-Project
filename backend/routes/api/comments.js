const express = require("express");
const { User, Song, Album, Playlist, Comment } = require('../../db/models')
const router = express.Router();
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require("sequelize");


// edit a comment 

router.put('/:commentId', requireAuth, async (req, res, next) => {
    const { commentId } = req.params;

    const editedComment = await Comment.findByPk(commentId);

    if (editedComment) {
        await editedComment.update({ ...req.body });
        return res.json(editedComment)
    } else {
        res.status(404)
        res.json({
            "message": "Comment couldn't be found",
            "statusCode": 404
        })
    }
        
});

//delete a comment

router.delete('/:commentId', requireAuth, restoreUser, async (req, res) => {
    const { commentId } = req.params;

    const byebye = await Comment.findByPk(commentId);
    if (byebye) {
        res.status(200)
        res.json({
            'message': "Successfully deleted",
            'statusCode': 200
        });
    } else {
        res.status(404)
        res.json(res.json({
            'message': "Comment couldn't be found",
            'statusCode': 404
        }));
    }
    await byebye.destroy()
});











module.exports = router;
