const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', noticeController.getNotices);
router.get('/:id', noticeController.getNotice);

// Admin routes (require auth)
router.post('/', auth.authenticate, noticeController.createNotice);
router.put('/:id', auth.authenticate, noticeController.updateNotice);
router.delete('/:id', auth.authenticate, noticeController.deleteNotice);

module.exports = router;
