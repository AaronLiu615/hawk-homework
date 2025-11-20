import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { count, setOpen } = useCart()
  const [open, setOpenLocal] = useState(false)

  const handleLinkClick = () => setOpenLocal(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar container navbar-light">
        <div className="d-flex align-items-center justify-content-between w-100 p-0">
          <div className="d-flex align-items-center gap-3">
            <NavLink className="navbar-brand text-danger fw-bold" to="/">Hunter Web Cafe</NavLink>
            <button className="btn btn-light d-lg-none" onClick={()=>setOpenLocal(v=>!v)} aria-expanded={open} aria-label="Toggle navigation">☰</button>
          </div>

          <div className={`d-lg-flex align-items-center ${open ? '' : 'd-none'} nav-mobile`}>
            <ul className="navbar-nav d-lg-flex flex-row me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink onClick={handleLinkClick} className="nav-link px-2" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink onClick={handleLinkClick} className="nav-link px-2" to="/menu">Menu</NavLink></li>
              <li className="nav-item"><NavLink onClick={handleLinkClick} className="nav-link px-2" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink onClick={handleLinkClick} className="nav-link px-2" to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-danger position-relative app-cart-btn" onClick={()=>setOpen(true)} aria-label="Open cart">
              🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
