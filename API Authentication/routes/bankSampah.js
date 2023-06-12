const express = require('express');
const router = express.Router();
const userController = require('../handler/bankSampahHandler');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'evidenceFile/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file document type. Only PDF and Word documents are allowed.'), false);
      }
    }
  });
const uploadImage = multer({ dest: 'profileImages/',
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
router.get('/', userController.getAllUsers);

// get users by id
router.get('/:userId', userController.getAllUsersById);

// create users
router.post('/', upload.single('file'), userController.createNewUser);

// update user
router.patch('/:userId', userController.updateUser);

// delete
router.delete('/:userId', userController.deleteUser);

// add profile picture
router.patch('/profile-picture/:userId', uploadImage.single('image'), userController.changeProfilePicture);

// change password
router.patch('/change-password/:userId', userController.changePassword);

// login
router.post('/login', userController.login);

module.exports = router;
