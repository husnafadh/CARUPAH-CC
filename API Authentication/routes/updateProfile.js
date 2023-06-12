const express = require('express');
const router = express.Router();
const profileHandler = require('../handler/updateProfileHandler');
const multer = require('multer');
const upload = multer({ dest: 'profileImages/',
fileFilter: (req, file, cb) => {
    // Check if the uploaded file is an image
    if (
        file.mimetype.startsWith('image/png') ||
        file.mimetype.startsWith('image/jpeg') ||
        file.mimetype.startsWith('image/jpg')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only image files are allowed.'), false);
    }
  } 
});

// get all users
router.get('/', profileHandler.getAllUsers);

// get users by id
router.get('/:userId', profileHandler.getAllUsersById);

// update profile
router.patch('/:userId', profileHandler.updateProfile);

// delete
router.delete('/:userId', profileHandler.deleteUser);

// profile picture
router.patch('/profile-picture/:userId', upload.single('image'), profileHandler.changeProfilePicture);

// change password
router.patch('/change-password/:userId', profileHandler.changePassword);

module.exports = router;
