const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser } = require('../controllers/userController');


// GET /api/users
router.get('/', getAllUsers);

// POST /api/users
router.post('/', createUser);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);

module.exports = router;
