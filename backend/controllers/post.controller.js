const Post = require('../models/post.model');

let createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = req.user._id;

    try {
        const result = await post.save();
        return res.status(202).send({
            message: "post saved!",
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

let getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        
        return res.status(302).send(
            {
                posts: posts,
                message: "Got all posts."
            }
        );

    } catch (error) {
        return next({
            status: 422,
            message: error.message
        });
    }
}

var updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: req.params.id,
                author: req.user._id
            },
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            },
            {
                new: true
            }
        );

        return res.status(202).send({
            message: "post updated!",
            updatePost: updatedPost
        });

    } catch (error) {
        return next({
            status: 422,
            message: error.message
        }
        );
    }
}

let deletePost = async (req, res, next) => {
    return res.send("deelete post req!");
}

module.exports = { getAllPosts, updatePost, createPost, deletePost }