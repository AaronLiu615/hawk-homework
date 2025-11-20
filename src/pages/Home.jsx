import React from 'react'
import PictureSlider from '../components/PictureSlider'

export default function Home(){
  return (
    <div>
      <section className="hero hero-full mb-4">
        <img src="/images/coffee_bar.jpg" alt="Banner" style={{width:'100%', height:320, objectFit:'cover', filter:'brightness(.6)'}} />
        <div className="hero-content text-center text-white">
          <h1 className="display-5">Hunter Web Cafe</h1>
          <p className="lead">Warm coffee. Fresh pastries. Cozy conversations.</p>
        </div>
      </section>

      <section className="intro mb-4">
        <h2>Welcome</h2>
        <p>At Hunter Web Cafe we serve seasonal dishes created from locally sourced ingredients. Stop by for breakfast, lunch, or dinner. Try our coffee!</p>
      </section>

      <section className="gallery mb-4">
        <h2>Gallery</h2>
        <PictureSlider
          images={[
            '/images/brunch_table.png',
            '/images/coffee.jpg',
            '/images/bagel.png',
            '/images/sandwich.png',
            '/images/salad.png',
            '/images/brunch.png',
          ]}
          autoPlay={false}
        />
      </section>

      <section className="features">
        <h2>Why choose us?</h2>
        <div className="row">
          <div className="col-md-4"><div className="card p-3"> <h5>Local Ingredients</h5><p>We partner with local farms to bring you the freshest produce.</p></div></div>
          <div className="col-md-4"><div className="card p-3"> <h5>Crafted Menu</h5><p>Rotating seasonal menu built around flavor and balance.</p></div></div>
          <div className="col-md-4"><div className="card p-3"> <h5>Cozy Atmosphere</h5><p>Comfortable seating and warm service for every meal.</p></div></div>
        </div>
      </section>
    </div>
  )
}
