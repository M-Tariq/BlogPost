const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post("/signin", authController.signin); 
router.post("/signup", authController.signup);

//get user profile
router.get("/me", authMiddleware, authController.getLoggedInUser);
router.put("/me", authMiddleware, authController.updateUser);
router.put("/change-password", authMiddleware, authController.changePassword);

//upload profile pic
const multer=require('multer');
const upload=multer({
  dest: 'public/images/'
});

router.post('/upload', authMiddleware, upload.single('upload'), authController.uploadProfilePic);
module.exports=router;