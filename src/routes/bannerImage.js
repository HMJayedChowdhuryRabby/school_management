const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getBannerImages, uploadBannerImage, deleteBannerImage } = require('../controllers/bannerImageController');
const { authenticate } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/banner'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', getBannerImages);
router.post('/', authenticate, upload.single('image'), uploadBannerImage);
router.delete('/:id', authenticate, deleteBannerImage);

module.exports = router;
