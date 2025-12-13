import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { menuAPI } from '../services/api'

export default function Menu(){
  const { addToCart } = useCart()
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    try {
      setLoading(true)
      const items = await menuAPI.getAllItems()
      setMenuItems(items)
      setError(null)
    } catch (err) {
      console.error('Error loading menu:', err)
      setError('Failed to load menu items. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Group menu items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  // Separate coffee items from other categories
  const coffeeItems = groupedMenu['Coffee Selections'] || []
  const otherCategories = Object.entries(groupedMenu).filter(([cat]) => cat !== 'Coffee Selections')

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading menu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={loadMenuItems}>Retry</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Hunter Web Cafe Menu</h1>
      <p>Breakfast, coffee, sandwiches, and pastries — made fresh daily.</p>

      <section className="menu-grid mb-4">
        <div className="row g-3">
          {otherCategories.map(([category, items]) => (
            <div key={category} className="col-md-4">
              <div className="card p-3">
                <h5>{category}</h5>
                <ul className="list-unstyled">
                  {items.map((item) => (
                    <li key={item._id} className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>{item.name}</div>
                        <div className="d-flex gap-2">
                          <div className="fw-semibold">${item.price.toFixed(2)}</div>
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => addToCart(item.name, item.price)}
                          >
                            Add
                          </button>
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

      {coffeeItems.length > 0 && (
        <section className="menu-table">
          <h3>Coffee Selections</h3>
          <div className="row">
            {coffeeItems.map((item) => (
              <div key={item._id} className="col-md-4 mb-2">
                <div className="d-flex justify-content-between align-items-center border p-2 rounded">
                  <div>{item.name}</div>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="fw-semibold">${item.price.toFixed(2)}</div>
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      onClick={() => addToCart(item.name, item.price)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
