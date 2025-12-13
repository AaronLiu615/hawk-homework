# Hunter Web Cafe - Full Stack Restaurant Application

A full-stack restaurant web application with menu browsing, shopping cart, and order management. Built with React, Node.js, Express, and MongoDB.

## Features

- **Dynamic Menu**: Browse menu items loaded from MongoDB database
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **Order Management**: Place orders with customer information, persisted to database
- **REST API**: Complete CRUD endpoints for menu items and orders
- **Responsive Design**: Bootstrap-based UI that works on all devices

## Project Structure

```
hawk-homework/
├── src/                    # React frontend
│   ├── components/        # UI components (Header, CartModal, etc.)
│   ├── pages/            # Route pages (Home, Menu, About, Contact)
│   ├── services/         # API client (api.js)
│   └── context/          # State management (CartContext)
├── server/               # Node.js backend
│   ├── models/          # Mongoose schemas (MenuItem, Order)
│   ├── routes/          # API endpoints (menuRoutes, orderRoutes)
│   ├── config/          # Database connection
│   └── scripts/         # Utility scripts (seedMenu.js)
└── public/              # Static assets
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   - Local: Install and start MongoDB (`mongod`)
   - OR use MongoDB Atlas (free cloud option)

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

4. **Seed database:**
   ```bash
   npm run seed
   ```

5. **Run the application:**
   ```bash
   # Terminal 1 - Backend
   npm run server:dev
   
   # Terminal 2 - Frontend  
   npm run dev
   ```

6. **Open browser:** http://localhost:5173

For detailed setup instructions, see [SETUP.md](SETUP.md)

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

See [API_TESTING.md](API_TESTING.md) for detailed examples and testing instructions.

## Technologies Used

**Frontend:** React 18, React Router, Vite, Bootstrap 5  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Dev Tools:** nodemon, CORS, dotenv

## Scripts

- `npm run dev` - Start frontend dev server
- `npm run build` - Build frontend for production
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend with auto-reload
- `npm run seed` - Seed database with menu items

## Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions and troubleshooting
- **[API_TESTING.md](API_TESTING.md)** - API endpoint examples and testing guide

## License

Educational project for Hunter College Web Development course.
