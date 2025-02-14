const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { authenticate } = require('../../middleware/authMiddleware'); // Caminho correto

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;