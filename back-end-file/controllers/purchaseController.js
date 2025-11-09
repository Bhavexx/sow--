const Purchase = require('../models/Purchase');

// Create a new purchase
const createPurchase = async (req, res) => {
  try {
    const { productId, productName, productPrice, customerName, customerEmail, customerAddress, customerPhone } = req.body;

    // Validate required fields
    if (!productId || !productName || !productPrice || !customerName || !customerEmail || !customerAddress || !customerPhone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create purchase record
    const purchaseData = {
      productId,
      productName,
      productPrice,
      customerName,
      customerEmail,
      customerAddress,
      customerPhone
    };

    const newPurchase = await Purchase.create(purchaseData);

    res.status(201).json({
      message: 'Purchase recorded successfully',
      purchase: newPurchase
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ message: 'Server error during purchase' });
  }
};

// Get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json({
      message: 'Purchases retrieved successfully',
      purchases
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({ message: 'Server error retrieving purchases' });
  }
};

// Get purchase by ID
const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findById(id);
    
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    
    res.json({
      message: 'Purchase retrieved successfully',
      purchase
    });
  } catch (error) {
    console.error('Get purchase error:', error);
    res.status(500).json({ message: 'Server error retrieving purchase' });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById
};