const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/authMiddleware');
const purchaseController = require('../../controllers/purchaseController');

router.get('/history', authenticate, purchaseController.getPurchaseHistory);
router.get('/:id', authenticate, purchaseController.getPurchaseDetails);

module.exports = router;