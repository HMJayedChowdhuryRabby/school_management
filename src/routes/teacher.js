const express = require('express');
const router = express.Router();
const { getAllTeachers, createTeacher, deleteTeacher } = require('../controllers/teacherController');

// GET /api/teachers
router.get('/', getAllTeachers);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;
