const express=require('express');
const router=express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const postController=require('../controllers/post.controller');

router.get('/posts', postController.getAllPosts);
router.post('/create-post', authMiddleware, postController.createPost);
router.put('/update-post/:id', authMiddleware, postController.updatePost);
router.delete('/delete-post', authMiddleware, postController.deletePost);

module.exports=router;