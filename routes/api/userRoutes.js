const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Rotas para usuários
router.get('/', userController.getAllUsers); // Listar todos os usuários
router.get('/:id', userController.getUserById); // Obter um usuário por ID
router.post('/', userController.createUser); // Criar um novo usuário
router.put('/:id', userController.updateUser); // Atualizar um usuário
router.delete('/:id', userController.deleteUser); // Excluir um usuário

module.exports = router;