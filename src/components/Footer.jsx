import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer bg-light mt-5">
      <div className="container py-4 d-flex justify-content-between">
        <div>
          <h5 className="mb-1">Hunter Web Cafe</h5>
          <div>123 Coffee Lane, Manhattan, New York, NY</div>
        </div>
        <div>
          <h6>Follow</h6>
          <div><a href="#">Facebook</a> · <a href="#">Instagram</a></div>
        </div>
        <div>
          <h6>Contact</h6>
          <div><a href="/contact">Contact Us</a></div>
        </div>
      </div>
      <div className="text-center text-muted py-2">© {new Date().getFullYear()} Hunter Web Cafe</div>
    </footer>
  )
}
