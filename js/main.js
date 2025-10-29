function injectCartHTML() {
  const navRow = document.querySelector('.nav-row');
  if (navRow && !document.getElementById('cartIcon')) {
    const cartIconDiv = document.createElement('div');
    cartIconDiv.className = 'cart-icon';
    cartIconDiv.id = 'cartIcon';
    cartIconDiv.innerHTML = '🛒 <span class="cart-count" id="cartCount">0</span>';
    navRow.appendChild(cartIconDiv);
  }

  if (!document.getElementById('cartModal')) {
    const cartModal = document.createElement('div');
    cartModal.id = 'cartModal';
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
      <div class="cart-content">
        <h2>Your Cart <button class="close-cart" id="closeCart">&times;</button></h2>
        <div id="cartItems" class="cart-items">
        </div>
        <div class="cart-summary">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cartTotal">$0.00</span>
          </div>
          <button id="clearCart" class="clear-cart-btn">Clear Cart</button>
        </div>
      </div>
    `;
    document.body.appendChild(cartModal);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  injectCartHTML();

  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const clearCartBtn = document.getElementById('clearCart');

  function updateCartDisplay() {
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    Object.entries(cart).forEach(([itemName, item]) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-info">
          <div>${itemName}</div>
          <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
          <button class="decrease-quantity" data-name="${itemName}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-quantity" data-name="${itemName}">+</button>
          <button class="remove-item" data-name="${itemName}">×</button>
        </div>
      `;
      cartItems.appendChild(itemEl);
      total += item.price * item.quantity;
      count += item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(name, price) {
    if (cart[name]) {
      cart[name].quantity++;
    } else {
      cart[name] = {
        price: parseFloat(price),
        quantity: 1
      };
    }
    updateCartDisplay();
  }

  function removeFromCart(name) {
    delete cart[name];
    updateCartDisplay();
  }

  function decreaseQuantity(name) {
    if (cart[name]) {
      cart[name].quantity--;
      if (cart[name].quantity <= 0) {
        removeFromCart(name);
      } else {
        updateCartDisplay();
      }
    }
  }

  function increaseQuantity(name) {
    if (cart[name]) {
      cart[name].quantity++;
      updateCartDisplay();
    }
  }

  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      cartModal.classList.add('show');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartModal.classList.remove('show');
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (Object.keys(cart).length === 0) {
        alert('Cart is already empty!');
        return;
      }
      
      if (confirm('Are you sure you want to clear your cart?')) {
        cart = {};
        updateCartDisplay();
        clearCartBtn.textContent = 'Cart Cleared!';
        setTimeout(() => {
          clearCartBtn.textContent = 'Clear Cart';
        }, 1500);
      }
    });
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.add-to-cart-btn, .remove-item, .decrease-quantity, .increase-quantity');
    if (!button) return;

    const name = button.dataset.name;
    if (button.classList.contains('add-to-cart-btn')) {
      const price = button.dataset.price;
      addToCart(name, price);
    } else if (button.classList.contains('remove-item')) {
      removeFromCart(name);
    } else if (button.classList.contains('decrease-quantity')) {
      decreaseQuantity(name);
    } else if (button.classList.contains('increase-quantity')) {
      increaseQuantity(name);
    }
  });

  updateCartDisplay();
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
