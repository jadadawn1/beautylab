const cartKey = 'beautyCart';

function loadCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateTotal() {
  const cart = loadCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tpl = document.getElementById('total-price');
  if (tpl) tpl.textContent = `$${total.toFixed(2)}`;
}

function renderCart() {
  const cart = loadCart();
  const tbody = document.querySelector('#cart-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  cart.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" min="1" class="qty" data-id="${item.id}" value="${item.quantity}"></td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
  updateTotal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  const tbody = document.querySelector('#cart-table tbody');
  if (!tbody) return;
  tbody.addEventListener('input', e => {
    if (e.target.classList.contains('qty')) {
      const id = parseInt(e.target.dataset.id, 10);
      const qty = parseInt(e.target.value, 10);
      const cart = loadCart();
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity = qty;
        saveCart(cart);
        renderCart();
      }
// Target the checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = loadCart();
      
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Requirement: Simulated checkout 
      alert("Thank you for your purchase! Your order has been placed successfully.");
      
      // Clear the cart after successful simulated purchase
      localStorage.removeItem(cartKey);
      
      // Requirement: Redirect to proper page after action 
      // Redirecting to profile/order history as per Sitemap 
      window.location.href = "profile.html"; 
    });
  }
    }
  });
  tbody.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const id = parseInt(e.target.dataset.id, 10);
      let cart = loadCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCart();
    }
  });
});