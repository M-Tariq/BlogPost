const express=require('express');
const router=express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const commentController=require('../controllers/comment.controller');

router.get('/comments/:postId', commentController.getComments);
router.post('/comment/:postId', authMiddleware, commentController.addComment);
router.delete('/comment/:postId', authMiddleware, commentController.deleteComment);

module.exports=router;