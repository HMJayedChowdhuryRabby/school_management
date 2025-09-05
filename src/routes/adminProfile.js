const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getProfiles, createProfile, deleteProfile } = require('../controllers/adminProfileController');
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

router.get('/', getProfiles);
router.post('/upload', auth.authenticate, upload.single('image'), createProfile);
router.delete('/:id', auth.authenticate, deleteProfile);

module.exports = router;
