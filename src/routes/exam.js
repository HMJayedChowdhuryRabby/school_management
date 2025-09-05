const express = require('express');
const router = express.Router();
const { getAllExams, createExam, deleteExam } = require('../controllers/examController');

router.get('/', getAllExams);
router.post('/', createExam);
router.delete('/:id', deleteExam);

module.exports = router;
