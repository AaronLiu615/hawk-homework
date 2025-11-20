import React from 'react'
import { useCart } from '../context/CartContext'

export default function Toast(){
  const { notification } = useCart()
  if(!notification || !notification.visible) return null

  return (
    <div className="app-toast" role="status" aria-live="polite">
      {notification.message}
    </div>
  )
}
