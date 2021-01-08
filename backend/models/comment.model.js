const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

}, 
{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;