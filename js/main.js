document.addEventListener('DOMContentLoaded', ()=>{
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const nav = btn.nextElementSibling;
      if(nav) nav.classList.toggle('show');
    })
  })
  document.querySelectorAll('.main-nav a').forEach(a=>{
    a.addEventListener('click', ()=>{
      const nav = a.closest('.main-nav');
      if(nav) nav.classList.remove('show');
    })
  })

  // slider
  const slider = document.getElementById('gallery-slider');
  if(slider){
    const slides = slider.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    let idx = 0;
    const show = i=>{slides.style.transform = `translateX(-${i*100}%)`}
    slider.querySelector('.prev').addEventListener('click', ()=>{idx = (idx-1+imgs.length)%imgs.length; show(idx)})
    slider.querySelector('.next').addEventListener('click', ()=>{idx = (idx+1)%imgs.length; show(idx)})
    setInterval(()=>{idx=(idx+1)%imgs.length; show(idx)},4000);
    slider.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft') { idx = (idx-1+imgs.length)%imgs.length; show(idx); }
      if(e.key === 'ArrowRight') { idx = (idx+1)%imgs.length; show(idx); }
    })
  }

  // contact form (no server)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const result = document.getElementById('form-result');
      result.textContent = 'Sending...';
      setTimeout(()=>{result.textContent = 'Thanks! We received your message.'; form.reset()},900)
    })
  }
})
