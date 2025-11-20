import React, { useState } from 'react'

export default function Contact(){
  const [result, setResult] = useState('')
  const handleSubmit = (e)=>{
    e.preventDefault();
    setResult('Sending...')
    setTimeout(()=>{ setResult('Thanks! We received your message.'); e.target.reset() }, 900)
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <div className="row">
        <div className="col-md-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.915271021061!2d-74.0060150845936!3d40.71277577933092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3163f6f8c7%3A0x7e0f8a0d0b0e6d87!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus" width="100%" height="300" style={{border:0}} allowFullScreen="" loading="lazy" />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <label className="form-label">Name</label>
            <input className="form-control" name="name" required />
            <label className="form-label mt-2">Email</label>
            <input className="form-control" name="email" type="email" required />
            <label className="form-label mt-2">Message</label>
            <textarea className="form-control" name="message" rows={5} required />
            <button className="btn btn-primary mt-3" type="submit">Send Message</button>
            <div className="mt-2 text-success" aria-live="polite">{result}</div>
          </form>
        </div>
      </div>
    </div>
  )
}
