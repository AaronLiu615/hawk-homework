import React, { useEffect, useRef, useState } from 'react'

export default function PictureSlider({ images = [], autoPlay = true, interval = 4000 }){
  const [index, setIndex] = useState(0)
  const slidesRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(()=>{
    if(!autoPlay) return
    timerRef.current = setInterval(()=>{
      setIndex(i => (i + 1) % images.length)
    }, interval)
    return ()=> clearInterval(timerRef.current)
  }, [images.length, autoPlay, interval])

  useEffect(()=>{
    const onKey = (e)=>{
      if(e.key === 'ArrowLeft') prev()
      if(e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  })

  function prev(){
    setIndex(i => (i - 1 + images.length) % images.length)
    resetTimer()
  }

  function next(){
    setIndex(i => (i + 1) % images.length)
    resetTimer()
  }

  function resetTimer(){
    if(timerRef.current){
      clearInterval(timerRef.current)
      timerRef.current = setInterval(()=> setIndex(i => (i + 1) % images.length), interval)
    }
  }

  return (
    <div className="picture-slider">
      <div className="slides" ref={slidesRef} style={{transform: `translateX(-${index * 100}%)`}}>
        {images.map((src, i)=> (
          <div className="slide" key={i} aria-hidden={i!==index}>
            <img src={src} alt={`Slide ${i+1}`} />
          </div>
        ))}
      </div>

      <button className="slider-btn prev" aria-label="Previous" onClick={prev}>‹</button>
      <button className="slider-btn next" aria-label="Next" onClick={next}>›</button>

      <div className="slider-dots">
        {images.map((_, i)=> (
          <button key={i} className={`dot ${i===index? 'active':''}`} onClick={()=> setIndex(i)} aria-label={`Go to slide ${i+1}`} />
        ))}
      </div>
    </div>
  )
}
