const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Ruta para el registro de usuarios
router.post('/register', register);

// Ruta para el login
router.post('/login', login);

module.exports = router;
