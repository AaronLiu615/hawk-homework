import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }){
  const [cart, setCart] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('cart')) || {} } catch { return {} }
  })
  const [open, setOpen] = useState(false)
  const [notification, setNotification] = useState({ message: '', visible: false })
  const notifTimerRef = React.useRef(null)

  useEffect(()=>{
    try { localStorage.setItem('cart', JSON.stringify(cart)) } catch(e){}
  }, [cart])

  function addToCart(name, price){
    setCart(prev=>{
      const next = {...prev}
      if(next[name]) next[name].quantity++
      else next[name] = { price: parseFloat(price), quantity: 1 }
      return next
    })
    // show a brief notification when an item is added
    showNotification(`${name} added to cart`)
  }

  function showNotification(message){
    if(notifTimerRef.current) clearTimeout(notifTimerRef.current)
    setNotification({ message, visible: true })
    notifTimerRef.current = setTimeout(()=>{
      setNotification({ message: '', visible: false })
      notifTimerRef.current = null
    }, 2200)
  }

  function removeFromCart(name){
    setCart(prev=>{ const next = {...prev}; delete next[name]; return next })
  }

  function decreaseQuantity(name){
    setCart(prev=>{
      const next = {...prev}
      if(!next[name]) return next
      next[name].quantity--
      if(next[name].quantity <= 0) delete next[name]
      return next
    })
  }

  function increaseQuantity(name){
    setCart(prev=>{ const next = {...prev}; if(next[name]) next[name].quantity++; return next })
  }

  function clearCart(){ setCart({}) }

  const total = Object.values(cart).reduce((s,i)=> s + (i.price * i.quantity), 0)
  const count = Object.values(cart).reduce((s,i)=> s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, total, count, open, setOpen, notification, showNotification }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext)
}
