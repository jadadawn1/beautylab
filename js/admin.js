const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser || currentUser.role !== 'Admin') {
    alert("Access Denied. Admins only.");
    window.location.href = "login.html";
}

import products from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    renderAdminProducts();
    renderAdminUsers();
    updateSalesReport();
});

// Function to Render Products for Admin
function renderAdminProducts() {
    const tbody = document.querySelector('#admin-product-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = products.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>In Stock</td>
            <td>
                <button onclick="alert('Edit logic for ${p.name}')">Edit</button>
                <button class="delete-btn" onclick="alert('Delete logic for ${p.name}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Function to Render Users (Simulated)
function renderAdminUsers() {
    const tbody = document.querySelector('#admin-user-table tbody');
    const users = [
        { name: "Jane Doe", email: "jane@example.com", role: "Customer", status: "Active" },
        { name: "John Admin", email: "admin@beautylab.com", role: "Admin", status: "Active" }
    ];

    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>${u.status}</td>
            <td>
                <button onclick="alert('Password Reset Sent')">Reset</button>
                <button onclick="alert('User Locked')">Lock</button>
            </td>
        </tr>
    `).join('');
}

function updateSalesReport() {
    document.getElementById('rev-total').textContent = "$1,250.00";
    document.getElementById('order-count').textContent = "45";
}