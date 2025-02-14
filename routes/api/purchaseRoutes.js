const express = require('express');
const router = express.Router();
const purchaseController = require('../../controllers/purchaseController');

// Rota para obter o histórico de compras de um usuário
router.get('/:userId', purchaseController.getPurchaseHistory);

module.exports = router;