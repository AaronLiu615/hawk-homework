const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Menu API
export const menuAPI = {
  // Get all menu items
  getAllItems: async () => {
    const response = await fetch(`${API_URL}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    return response.json();
  },

  // Get single menu item
  getItem: async (id) => {
    const response = await fetch(`${API_URL}/menu/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu item');
    }
    return response.json();
  },

  // Create menu item (admin)
  createItem: async (itemData) => {
    const response = await fetch(`${API_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error('Failed to create menu item');
    }
    return response.json();
  },

  // Update menu item (admin)
  updateItem: async (id, itemData) => {
    const response = await fetch(`${API_URL}/menu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    return response.json();
  },

  // Delete menu item (admin)
  deleteItem: async (id) => {
    const response = await fetch(`${API_URL}/menu/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }
    return response.json();
  },
};

// Order API
export const orderAPI = {
  // Get all orders
  getAllOrders: async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  },

  // Get single order
  getOrder: async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }
    return response.json();
  },

  // Update order
  updateOrder: async (id, orderData) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to update order');
    }
    return response.json();
  },

  // Delete order
  deleteOrder: async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
    return response.json();
  },
};
