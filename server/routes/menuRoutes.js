const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Server error while fetching menu items' });
  }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ message: 'Server error while fetching menu item' });
  }
});

// @route   POST /api/menu
// @desc    Create a new menu item (admin)
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
  try {
    const { name, price, category, description, available } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }
    
    const menuItem = new MenuItem({
      name,
      price,
      category,
      description,
      available
    });
    
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Menu item with this name already exists' });
    }
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Server error while creating menu item' });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update a menu item (admin)
// @access  Public (should be protected in production)
router.put('/:id', async (req, res) => {
  try {
    const { name, price, category, description, available } = req.body;
    
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    if (name) menuItem.name = name;
    if (price !== undefined) menuItem.price = price;
    if (category) menuItem.category = category;
    if (description !== undefined) menuItem.description = description;
    if (available !== undefined) menuItem.available = available;
    
    const updatedItem = await menuItem.save();
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Server error while updating menu item' });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item (admin)
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    await menuItem.deleteOne();
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Server error while deleting menu item' });
  }
});

module.exports = router;
