import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { orderAPI } from '../services/api'

export default function CartModal(){
  const { cart, open, setOpen, total, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, showNotification } = useCart()
  const [placing, setPlacing] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handlePlaceOrder = async () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty')
      return
    }

    try {
      setPlacing(true)
      
      // Convert cart object to items array
      const items = Object.entries(cart).map(([name, item]) => ({
        name,
        price: item.price,
        quantity: item.quantity
      }))

      const orderData = {
        items,
        total,
        customerName: customerName.trim() || 'Guest',
        customerEmail: customerEmail.trim(),
        notes: notes.trim()
      }

      const savedOrder = await orderAPI.createOrder(orderData)
      
      showNotification('Order placed successfully! Order ID: ' + savedOrder._id.slice(-6))
      clearCart()
      setShowOrderForm(false)
      setCustomerName('')
      setCustomerEmail('')
      setNotes('')
      setOpen(false)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div>
      {open && (
        <div className="app-cart-modal">
          <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
            <h5 className="m-0">Your Cart</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={()=>setOpen(false)}>Close</button>
          </div>
          <div className="p-3 app-cart-items">
            {Object.keys(cart).length === 0 && <div className="text-muted">Cart is empty</div>}
            {Object.entries(cart).map(([name, item]) => (
              <div key={name} className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div className="fw-semibold">{name}</div>
                  <div className="text-muted">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>decreaseQuantity(name)}>-</button>
                  <div>{item.quantity}</div>
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>increaseQuantity(name)}>+</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>removeFromCart(name)}>×</button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-top">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-bold">Total</div>
              <div className="fw-bold">${total.toFixed(2)}</div>
            </div>
            
            {showOrderForm ? (
              <div>
                <div className="mb-2">
                  <label className="form-label small">Name (optional)</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Email (optional)</label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small">Special instructions (optional)</label>
                  <textarea 
                    className="form-control form-control-sm"
                    rows="2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests?"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-success" 
                    onClick={handlePlaceOrder}
                    disabled={placing}
                  >
                    {placing ? 'Placing Order...' : 'Confirm Order'}
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => setShowOrderForm(false)}
                    disabled={placing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowOrderForm(true)}
                  disabled={Object.keys(cart).length === 0}
                >
                  Place Order
                </button>
                <button 
                  className="btn btn-outline-danger" 
                  onClick={() => { 
                    if(Object.keys(cart).length > 0 && confirm('Clear cart?')) clearCart() 
                  }}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
