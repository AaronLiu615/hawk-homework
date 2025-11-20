import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import CartModal from './components/CartModal'
import Toast from './components/Toast'

export default function App(){
  return (
    <div>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>
      <CartModal />
      <Toast />
      <Footer />
    </div>
  )
}
