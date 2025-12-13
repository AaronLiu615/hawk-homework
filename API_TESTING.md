# API Testing Guide

This file contains examples for testing the Hunter Web Cafe API using curl, Postman, or your browser.

## Base URL
```
http://localhost:5000/api
```

## Menu Endpoints

### 1. Get All Menu Items
```bash
curl http://localhost:5000/api/menu
```

**Response Example:**
```json
[
  {
    "_id": "123abc",
    "name": "Avocado Toast",
    "price": 8,
    "category": "Breakfast & Toasts",
    "description": "",
    "available": true,
    "createdAt": "2025-12-12T...",
    "updatedAt": "2025-12-12T..."
  }
]
```

### 2. Get Single Menu Item
```bash
curl http://localhost:5000/api/menu/{item-id}
```

### 3. Create Menu Item (Admin)
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blueberry Pancakes",
    "price": 9.5,
    "category": "Breakfast & Toasts",
    "description": "Fluffy pancakes with fresh blueberries",
    "available": true
  }'
```

### 4. Update Menu Item (Admin)
```bash
curl -X PUT http://localhost:5000/api/menu/{item-id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 10.5,
    "available": true
  }'
```

### 5. Delete Menu Item (Admin)
```bash
curl -X DELETE http://localhost:5000/api/menu/{item-id}
```

## Order Endpoints

### 1. Get All Orders
```bash
curl http://localhost:5000/api/orders
```

**Response Example:**
```json
[
  {
    "_id": "456def",
    "items": [
      {
        "name": "Avocado Toast",
        "price": 8,
        "quantity": 2
      },
      {
        "name": "Latte",
        "price": 4,
        "quantity": 1
      }
    ],
    "total": 20,
    "status": "pending",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "notes": "No onions please",
    "createdAt": "2025-12-12T...",
    "updatedAt": "2025-12-12T..."
  }
]
```

### 2. Get Single Order
```bash
curl http://localhost:5000/api/orders/{order-id}
```

### 3. Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "Avocado Toast",
        "price": 8,
        "quantity": 2
      },
      {
        "name": "Latte",
        "price": 4,
        "quantity": 1
      }
    ],
    "total": 20,
    "customerName": "Jane Smith",
    "customerEmail": "jane@example.com",
    "notes": "Extra crispy toast"
  }'
```

### 4. Update Order Status
```bash
curl -X PUT http://localhost:5000/api/orders/{order-id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Valid status values:**
- `pending` - Order just placed
- `processing` - Order being prepared
- `completed` - Order finished
- `cancelled` - Order cancelled

### 5. Delete Order
```bash
curl -X DELETE http://localhost:5000/api/orders/{order-id}
```

## Testing with Postman

1. **Import Collection**: Create a new collection called "Hunter Web Cafe API"

2. **Set Base URL**: Create an environment variable
   - Variable: `base_url`
   - Value: `http://localhost:5000/api`

3. **Create Requests**:
   - GET `{{base_url}}/menu`
   - POST `{{base_url}}/menu`
   - GET `{{base_url}}/orders`
   - POST `{{base_url}}/orders`

4. **Add Headers**: For POST/PUT requests
   - Key: `Content-Type`
   - Value: `application/json`

## Testing Workflow Example

### 1. Start Fresh - Get Current Menu
```bash
curl http://localhost:5000/api/menu
```

### 2. Place an Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name": "Espresso", "price": 2.5, "quantity": 2},
      {"name": "Chocolate Muffin", "price": 3.5, "quantity": 1}
    ],
    "total": 8.5,
    "customerName": "Test Customer",
    "customerEmail": "test@test.com"
  }'
```

Save the returned `_id` from the response.

### 3. View All Orders
```bash
curl http://localhost:5000/api/orders
```

### 4. Update Order Status
```bash
# Replace {order-id} with actual ID from step 2
curl -X PUT http://localhost:5000/api/orders/{order-id} \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### 5. Verify Update
```bash
curl http://localhost:5000/api/orders/{order-id}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Order must contain at least one item"
}
```

### 404 Not Found
```json
{
  "message": "Menu item not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error while creating order"
}
```

## Using Browser Developer Tools

You can also test GET endpoints directly in the browser:

1. Open `http://localhost:5000/api/menu`
2. Open DevTools (F12)
3. Go to Network tab
4. View response

For POST/PUT/DELETE, use the Console:

```javascript
// Place an order
fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [
      { name: 'Latte', price: 4, quantity: 1 }
    ],
    total: 4,
    customerName: 'Browser Test'
  })
})
.then(r => r.json())
.then(console.log)
```

## MongoDB Verification

After testing the API, verify data in MongoDB:

```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use hunter-web-cafe

# View menu items
db.menuitems.find().pretty()

# View orders
db.orders.find().pretty()

# Count orders
db.orders.countDocuments()

# Find orders by status
db.orders.find({ status: 'pending' }).pretty()
```

## Tips

- Use `jq` for pretty JSON in terminal: `curl ... | jq`
- Save common requests in a bash script
- Use Postman Collections to organize requests
- Monitor backend server logs while testing
- Check MongoDB Compass for visual database inspection
