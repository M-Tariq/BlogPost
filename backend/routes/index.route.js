const express = require('express');
const router = express.Router();

const authRouter = require('../routes/auth.route');
const postRouter=require('../routes/post.route');
const commentRouter=require('../routes/comment.route');
const uploadImageRouter=require('../routes/uploadImage.route');

router.use('/auth', authRouter);
router.use('', postRouter);
router.use('/post', commentRouter);
router.use('', uploadImageRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;