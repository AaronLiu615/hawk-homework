const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   GET /api/orders
// @desc    Get all orders
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error while fetching order' });
  }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { items, total, customerName, customerEmail, notes } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    
    if (!total || total <= 0) {
      return res.status(400).json({ message: 'Order total must be greater than zero' });
    }
    
    // Validate each item has required fields
    for (const item of items) {
      if (!item.name || !item.price || !item.quantity) {
        return res.status(400).json({ message: 'Each item must have name, price, and quantity' });
      }
    }
    
    const order = new Order({
      items,
      total,
      customerName: customerName || 'Guest',
      customerEmail: customerEmail || '',
      notes: notes || '',
      status: 'pending'
    });
    
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Public (should be protected in production)
router.put('/:id', async (req, res) => {
  try {
    const { status, customerName, customerEmail, notes } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (status) order.status = status;
    if (customerName) order.customerName = customerName;
    if (customerEmail !== undefined) order.customerEmail = customerEmail;
    if (notes !== undefined) order.notes = notes;
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error while updating order' });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete an order
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.deleteOne();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error while deleting order' });
  }
});

module.exports = router;
