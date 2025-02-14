// controllers/ticketController.js
const Ticket = require('../models/Ticket');
const Purchase = require('../models/Purchase');

// controllers/ticketController.js
exports.createTicket = async (req, res) => {
  const { name, price, quantity, description } = req.body; // Inclua description
  try {
    const ticket = await Ticket.create({ name, price, quantity, description }); // Inclua description
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ingresso', error });
  }
};


exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ingressos', error });
  }
};

exports.getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ingresso não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ingresso', error });
  }
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      ticket.name = name || ticket.name;
      ticket.price = price || ticket.price;
      ticket.quantity = quantity || ticket.quantity;
      await ticket.save();
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ingresso não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar ingresso', error });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      await ticket.destroy();
      res.json({ message: 'Ingresso excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Ingresso não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir ingresso', error });
  }
};

exports.purchaseTickets = async (req, res) => {
  const { userId, tickets } = req.body; // tickets = [{ ticketId, quantity }]
  try {
    for (const item of tickets) {
      const ticket = await Ticket.findByPk(item.ticketId);
      if (!ticket) {
        return res.status(404).json({ message: `Ingresso com ID ${item.ticketId} não encontrado` });
      }
      if (ticket.quantity < item.quantity) {
        return res.status(400).json({ message: `Estoque insuficiente para o ingresso ${ticket.name}` });
      }
      ticket.quantity -= item.quantity;
      await ticket.save();
      await Purchase.create({ userId, ticketId: item.ticketId, quantity: item.quantity });
    }
    res.json({ message: 'Compra realizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar a compra', error });
  }
};