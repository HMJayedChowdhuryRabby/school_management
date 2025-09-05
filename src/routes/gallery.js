const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getImages, uploadImage, deleteImage } = require('../controllers/galleryController');
const auth = require('../middleware/auth');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', getImages);
router.post('/upload', auth.authenticate, upload.single('image'), uploadImage);
router.delete('/:id', auth.authenticate, deleteImage);

module.exports = router;
