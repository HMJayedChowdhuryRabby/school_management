const express = require('express');
const router = express.Router();
const { getAllGrades, createGrade, deleteGrade } = require('../controllers/gradeController');

router.get('/', getAllGrades);
router.post('/', createGrade);
router.delete('/:id', deleteGrade);

module.exports = router;
