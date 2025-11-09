const express = require('express');
const router = express.Router();
const { createPurchase, getAllPurchases, getPurchaseById } = require('../controllers/purchaseController');

// Create purchase route
router.post('/create', createPurchase);

// Get all purchases route
router.get('/', getAllPurchases);

// Get purchase by ID route
router.get('/:id', getPurchaseById);

module.exports = router;