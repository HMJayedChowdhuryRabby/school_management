const express = require('express');
const router = express.Router();
const { getAllAttendance, createAttendance, deleteAttendance } = require('../controllers/attendanceController');

router.get('/', getAllAttendance);
router.post('/', createAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
