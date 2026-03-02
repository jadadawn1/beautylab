import skincareProducts from './products.js'; // Changed from 'products' to match your array name

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('featured-products-container');
    
    if (container) {
        // Requirement: Show 3 featured products (IDs 1, 2, and 3)
        const featured = skincareProducts.slice(0, 3); 

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