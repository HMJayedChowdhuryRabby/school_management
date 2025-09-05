const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent, deleteStudent } = require('../controllers/studentController');

router.get('/', getAllStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
