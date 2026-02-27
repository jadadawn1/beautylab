const skincareProducts = [
  {
    id: 1,
    name: "Gentle Foam Cleanser",
    price: 14.99,
    skinType: "All Skin Types",
    image: "images/gentle-foam-cleanser.jpg",
    ingredients: ["water", "glycerin", "cocamidopropyl betaine", "aloe vera"],
    howToUse:
      "Wet face, dispense a small amount, massage into skin and rinse thoroughly.",
    rating: 4.5
  },
  {
    id: 2,
    name: "Clarifying Gel Cleanser",
    price: 15.99,
    skinType: "Oily/Acne-Prone",
    image: "images/clarifying-gel-cleanser.jpg",
    ingredients: ["salicylic acid", "tea tree extract", "witch hazel"],
    howToUse:
      "Massage onto damp skin, focusing on oily areas; rinse with lukewarm water.",
    rating: 4.3
  },
  {
    id: 3,
    name: "Vitamin C Brightening Serum",
    price: 29.99,
    skinType: "Dull Skin",
    image: "images/brightening-vitamin-c-serum.jpg",
    ingredients: ["ascorbic acid", "ferulic acid", "hyaluronic acid"],
    howToUse:
      "Apply 2–3 drops to clean, dry face each morning before moisturizer.",
    rating: 4.7
  },
  {
    id: 4,
    name: "Hyaluronic Hydration Serum",
    price: 27.5,
    skinType: "Dry Skin",
    image: "images/hydrating-hyaluronic-acid-serum.jpg",
    ingredients: ["hyaluronic acid", "glycerin", "panthenol"],
    howToUse:
      "Pat onto damp skin after cleansing, then follow with moisturizer.",
    rating: 4.6
  },
  {
    id: 5,
    name: "Retinol Renewal Serum",
    price: 32.0,
    skinType: "Aging Skin",
    image: "images/retinol-night-serum.jpg",
    ingredients: ["retinol", "peptides", "vitamin E"],
    howToUse:
      "Use at night on clean skin; start 1–2 times weekly and build tolerance.",
    rating: 4.4
  },
  {
    id: 6,
    name: "Barrier Repair Cream",
    price: 24.5,
    skinType: "Sensitive Skin",
    image: "images/rich-nourishing-cream.jpg",
    ingredients: ["ceramides", "niacinamide", "shea butter"],
    howToUse:
      "Smooth over face and neck as the last step of your routine, morning & night.",
    rating: 4.6
  },
  {
    id: 7,
    name: "Daily Hydration Lotion",
    price: 21.0,
    skinType: "Normal Skin",
    image: "images/ultra-light-moisturizer.jpg",
    ingredients: ["squalane", "jojoba oil", "vitamin B5"],
    howToUse:
      "Apply generously to face and neck after serums, morning and evening.",
    rating: 4.2
  },
  {
    id: 8,
    name: "Mineral SPF 50 Shield",
    price: 19.99,
    skinType: "All Skin Types",
    image: "images/mineral-spf50.jpg",
    ingredients: ["zinc oxide", "titanium dioxide", "aloe vera"],
    howToUse:
      "Apply liberally 15 minutes before sun exposure and reapply every 2 hours.",
    rating: 4.8
  },

  {
    id: 9,
    name: "Overnight Repair Mask",
    price: 28.0,
    skinType: "Dry/Dull Skin",
    image: "images/soothing-calming-mask.jpg",
    ingredients: ["rosehip oil", "squalane", "niacinamide"],
    howToUse:
      "Apply a thin layer to clean skin before bed; rinse in the morning.",
    rating: 4.5
  },
  {
    id: 10,
    name: "Acne Control Spot Treatment",
    price: 18.5,
    skinType: "Oily/Acne-Prone",
    image: "images/clarifying-acne-treatment.jpg",
    ingredients: ["benzoyl peroxide", "salicylic acid", "tea tree oil"],
    howToUse:
      "Dab directly onto blemishes once or twice daily until clear.",
    rating: 4.3
  }
];

// simple logged-in flag; in real app check auth state or localStorage
let isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));

function addToCart(productId) {
  if (!isLoggedIn) return;
  const cartKey = 'beautyCart';
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const product = skincareProducts.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert('Added to cart');
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  skincareProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button class="view-btn" data-id="${p.id}">View Details</button>
      <button class="add-btn" data-id="${p.id}" ${!isLoggedIn ? 'disabled title="login to add"' : ''}>Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const p = skincareProducts.find(x => x.id === id);
  if (!p) return;
  const container = document.getElementById('product-detail');
  if (!container) return;
  container.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <h2>${p.name}</h2>
    <p>Price: $${p.price.toFixed(2)}</p>
    <p>Skin Type: ${p.skinType}</p>
    <p>Rating: ${p.rating}</p>
    <p>Ingredients: ${p.ingredients.join(', ')}</p>
    <p>How to use: ${p.howToUse}</p>
    <button class="add-btn" data-id="${p.id}" ${!isLoggedIn ? 'disabled title="login to add"' : ''}>Add to Cart</button>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('product-grid')) {
    renderProducts();
  }
  if (document.getElementById('product-detail')) {
    renderProductDetail();
  }
  document.getElementById('product-grid')?.addEventListener('click', e => {
    if (e.target.matches('.view-btn')) {
      const id = parseInt(e.target.dataset.id, 10);
      window.location.href = `product-detail.html?id=${id}`;
    }
    if (e.target.matches('.add-btn')) {
      const id = parseInt(e.target.dataset.id, 10);
      addToCart(id);
    }
  });
  document.body.addEventListener('click', e => {
    if (e.target.matches('.add-btn') && e.target.closest('#product-detail')) {
      const id = parseInt(e.target.dataset.id, 10);
      addToCart(id);
    }
  });
});