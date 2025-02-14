const express = require('express');
const router = express.Router();
const ticketController = require('../../controllers/ticketController');

// Rotas para ingressos
router.get('/', ticketController.getTickets); // Listar todos os ingressos
router.get('/:id', ticketController.getTicketById); // Obter um ingresso por ID
router.post('/', ticketController.createTicket); // Criar um novo ingresso
router.post('/purchase', ticketController.purchaseTickets);
router.put('/:id', ticketController.updateTicket); // Atualizar um ingresso
router.delete('/:id', ticketController.deleteTicket); // Excluir um ingresso

module.exports = router;