const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTeacherWithPhoto } = require('../controllers/teacherController');
const { authenticate } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/teacher'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', authenticate, upload.single('photo'), createTeacherWithPhoto);

module.exports = router;
