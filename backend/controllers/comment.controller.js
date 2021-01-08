const Comment = require('../models/comment.model');

//get comments of post
let getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        return res.status(302).send({
            message: "all comments of this post",
            comments: comments
        })

    } catch (error) {
        return next({
            status: 404,
            message: error.message
        }
        );
    }
}

let addComment = async (req, res) => {
    const comment = new Comment();
    comment.comment = req.body.comment;
    comment.author = req.user._id;
    comment.postId = req.params.postId;

    try {
        const savedComment = await comment.save();

        return res.send({
            message: "Saved",
            comment: savedComment
        })

    } catch (error) {
        return next({
            status: 422,
            message: error.message
        }
        );
    }
}

let deleteComment = async (req, res) => {

    try {
        const result = await Comment.deleteOne({ author: req.user._id, postId: req.params.postId });

        return res.send({
            message: "Comment deleted!",
            result: result
        });

    } catch (error) {

        return next({
            status: 422,
            message: error.message
        }
        );
    }
}

module.exports = { getComments, addComment, deleteComment };