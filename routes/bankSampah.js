const express = require('express');
const router = express.Router();
const bankSampahHandler = require('./handlers/bankSampahHandler');
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
router.get('/', bankSampahHandler.getAllUsers);

// get users by id
router.get('/:userId', bankSampahHandler.getAllUsersById);

// create users
router.post('/', upload.single('file'), bankSampahHandler.createNewUser);

// update user
router.patch('/:userId', bankSampahHandler.updateUser);

// delete
router.delete('/:userId', bankSampahHandler.deleteUser);

// add profile picture
router.patch('/profile-picture/:userId', uploadImage.single('image'), bankSampahHandler.changeProfilePicture);

// change password
router.patch('/change-password/:userId', bankSampahHandler.changePassword);

// login
router.post('/login', bankSampahHandler.login);

module.exports = router;
