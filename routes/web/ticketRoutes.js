// routes/web/ticketRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../../middleware/authMiddleware');
const ticketController = require('../../controllers/ticketController'); // Verifique o caminho
const Purchase = require('../../models/Purchase');
const Ticket = require('../../models/Ticket');

// Rota para listar ingressos (protegida)
router.get('/', authenticate, async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.render('tickets', { tickets }); // Renderiza a view com os ingressos
  } catch (error) {
    res.status(500).send('Erro ao buscar ingressos');
  }
});

// Rota para criar um novo ingresso (apenas para administradores)
router.post('/create', authenticate, isAdmin, ticketController.createTicket); // Aqui está o problema

// Rota para processar a compra de um ingresso
router.post('/purchase/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId; // ID do usuário logado

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).send('Ingresso não encontrado');
    }

    if (ticket.quantity < quantity) {
      return res.status(400).send('Estoque insuficiente');
    }

    // Atualiza o estoque do ingresso
    ticket.quantity -= quantity;
    await ticket.save();

    // Registra a compra
    await Purchase.create({ userId, ticketId: id, quantity });

    res.redirect('/tickets'); // Redireciona para a lista de ingressos após a compra
  } catch (error) {
    res.status(500).send('Erro ao processar a compra');
  }
});

// Rota para exibir a página de compra de um ingresso
router.get('/purchase/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      res.render('purchase', { ticket });
    } else {
      res.status(404).send('Ingresso não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar ingresso');
  }
});
module.exports = router;