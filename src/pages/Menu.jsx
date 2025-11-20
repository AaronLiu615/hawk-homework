import React from 'react'
import { useCart } from '../context/CartContext'

const MENU = [
  { category: 'Breakfast & Toasts', items: [ ['Avocado Toast', 8], ['Greek Yogurt & Granola', 7], ['Breakfast Croissant', 6] ] },
  { category: 'Sandwiches & Bowls', items: [ ['Smoked Turkey Panini', 11], ['Caprese Sandwich', 10], ['Quinoa Bowl', 12] ] },
  { category: 'Pastries & Sweets', items: [ ['Almond Croissant', 4], ['Chocolate Muffin', 3.5], ['Fruit Tart', 5] ] },
]

const COFFEE = [ ['Espresso',2.5], ['Americano',3.0], ['Latte',4.0], ['Cappuccino',4.0], ['Mocha',4.5], ['Iced Coffee',3.5] ]

export default function Menu(){
  const { addToCart } = useCart()

  return (
    <div>
      <h1>Hunter Web Cafe Menu</h1>
      <p>Breakfast, coffee, sandwiches, and pastries — made fresh daily.</p>

      <section className="menu-grid mb-4">
        <div className="row g-3">
          {MENU.map((col)=> (
            <div key={col.category} className="col-md-4">
              <div className="card p-3">
                <h5>{col.category}</h5>
                <ul className="list-unstyled">
                  {col.items.map(([name,price])=> (
                    <li key={name} className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>{name}</div>
                        <div className="d-flex gap-2">
                          <div className="fw-semibold">${price}</div>
                          <button className="btn btn-sm btn-outline-primary" onClick={()=>addToCart(name, price)}>Add</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="menu-table">
        <h3>Coffee Selections</h3>
        <div className="row">
          {COFFEE.map(([name,price])=> (
            <div key={name} className="col-md-4 mb-2">
              <div className="d-flex justify-content-between align-items-center border p-2 rounded">
                <div>{name}</div>
                <div className="d-flex gap-2 align-items-center"><div className="fw-semibold">${price.toFixed(2)}</div><button className="btn btn-sm btn-outline-primary" onClick={()=>addToCart(name, price)}>Add</button></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
