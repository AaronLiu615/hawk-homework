# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB runs as a service automatically
   ```

### Option B: MongoDB Atlas (Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `.env` file with your connection string

## Step 3: Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your MongoDB URI
# For local: mongodb://localhost:27017/hunter-web-cafe
# For Atlas: mongodb+srv://username:password@cluster.xxxxx.mongodb.net/hunter-web-cafe
```

## Step 4: Seed Database
```bash
npm run seed
```

Expected output:
```
MongoDB Connected
Existing menu items cleared
Menu items seeded successfully
```

## Step 5: Run the Application

### Terminal 1 - Backend Server
```bash
npm run server:dev
```
Should see: `Server is running on port 5000`

### Terminal 2 - Frontend Dev Server
```bash
npm run dev
```
Should see: `Local: http://localhost:5173`

## Step 6: Test the Application

1. Open browser to `http://localhost:5173`
2. Click "Menu" in navigation
3. Add items to cart
4. Click cart icon in header
5. Fill in order details (optional)
6. Click "Place Order"
7. Order should be saved to database!

## Testing the API Directly

### Get menu items:
```bash
curl http://localhost:5000/api/menu
```

### Get all orders:
```bash
curl http://localhost:5000/api/orders
```

### Create test order:
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"name": "Latte", "price": 4, "quantity": 1}],
    "total": 4,
    "customerName": "Test User"
  }'
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check your MONGODB_URI in `.env`
- For Atlas: whitelist your IP address in Atlas dashboard

### "Port 5000 already in use"
- Change PORT in `.env` to another port (e.g., 5001)
- Or stop the process using port 5000

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Frontend can't connect to backend
- Make sure backend server is running on port 5000
- Check that VITE_API_URL in `.env.local` matches your backend URL
- Check browser console for CORS errors

## Available Scripts

- `npm run dev` - Start Vite dev server (frontend)
- `npm run build` - Build frontend for production
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend with nodemon (auto-restart)
- `npm run seed` - Seed database with menu items

## Next Steps

1. Try placing orders through the UI
2. Check MongoDB to see stored orders
3. Modify menu items in the database
4. Explore the API endpoints
5. Customize the frontend components

For more details, see the main README.md file.
