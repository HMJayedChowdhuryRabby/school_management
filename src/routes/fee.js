const express = require('express');
const router = express.Router();
const { getAllFees, createFee, deleteFee } = require('../controllers/feeController');

router.get('/', getAllFees);
router.post('/', createFee);
router.delete('/:id', deleteFee);

module.exports = router;
