const express = require('express');
const router = express.Router();
const { getAllClasses, createClass, deleteClass } = require('../controllers/classController');

router.get('/', getAllClasses);
router.post('/', createClass);
router.delete('/:id', deleteClass);

module.exports = router;
