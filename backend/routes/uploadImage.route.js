const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const authMiddleware = require('../middlewares/auth.middleware');
// const uploadImage=require('../controllers/uploadImage');

const multer = require('multer');
const upload = multer({
    dest: "images",
    limits: {
        fileSize: 5000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image."));
        }
        cb(undefined, true);
    },
    filename: function (req, file, next) {
        const updatedFileName = `${req.user.username}.${file.originalname.split(".")[1]}`;
        next(null, updatedFileName);
    }
});
upload.single('profilePic');

router.post('/uploadImage', upload.single('profilePic'), authMiddleware, async (req, res) => {
    //get image exstension
    const ext = req.file.originalname.split(".")[1];
    const imageURL = req.file.filename + "." + ext;

    try {
        await User.updateOne({ _id: req.user._id }, { $set: { imageUrl: imageURL } });
        return res.send({
            imageURL: imageURL,
            user: req.user
        });

    } catch (error) {
        return next({
            status: 400,
            message: error.message
        });
    }
});

module.exports = router;