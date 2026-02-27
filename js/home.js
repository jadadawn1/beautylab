import products from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('featured-products-container');
    
    if (container) {
        // Requirements: Show 3-4 products
        const featured = products.slice(0, 3); 

        container.innerHTML = featured.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="product-detail.html?id=${product.id}" class="view-btn">View Details</a>
            </div>
        `).join('');
    }
});