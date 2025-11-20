import React from 'react'
import { useCart } from '../context/CartContext'

export default function CartModal(){
  const { cart, open, setOpen, total, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart()

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
            <div className="d-grid gap-2">
              <button className="btn btn-danger" onClick={()=>{ if(Object.keys(cart).length>0){ if(confirm('Clear cart?')) clearCart() }}}>Clear Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
