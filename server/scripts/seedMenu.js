const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');

// Load environment variables
dotenv.config();

// Menu data to seed
const menuItems = [
  // Breakfast & Toasts
  { name: 'Avocado Toast', price: 8, category: 'Breakfast & Toasts' },
  { name: 'Greek Yogurt & Granola', price: 7, category: 'Breakfast & Toasts' },
  { name: 'Breakfast Croissant', price: 6, category: 'Breakfast & Toasts' },
  
  // Sandwiches & Bowls
  { name: 'Smoked Turkey Panini', price: 11, category: 'Sandwiches & Bowls' },
  { name: 'Caprese Sandwich', price: 10, category: 'Sandwiches & Bowls' },
  { name: 'Quinoa Bowl', price: 12, category: 'Sandwiches & Bowls' },
  
  // Pastries & Sweets
  { name: 'Almond Croissant', price: 4, category: 'Pastries & Sweets' },
  { name: 'Chocolate Muffin', price: 3.5, category: 'Pastries & Sweets' },
  { name: 'Fruit Tart', price: 5, category: 'Pastries & Sweets' },
  
  // Coffee Selections
  { name: 'Espresso', price: 2.5, category: 'Coffee Selections' },
  { name: 'Americano', price: 3.0, category: 'Coffee Selections' },
  { name: 'Latte', price: 4.0, category: 'Coffee Selections' },
  { name: 'Cappuccino', price: 4.0, category: 'Coffee Selections' },
  { name: 'Mocha', price: 4.5, category: 'Coffee Selections' },
  { name: 'Iced Coffee', price: 3.5, category: 'Coffee Selections' },
];

const seedMenu = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('MongoDB Connected');
    
    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Existing menu items cleared');
    
    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    console.log('Menu items seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
};

seedMenu();
