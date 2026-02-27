// Simulated user database (persisted in localStorage)
let users = JSON.parse(localStorage.getItem('beautyUsers')) || [];

function saveUsers() {
    localStorage.setItem('beautyUsers', JSON.stringify(users));
}

function registerUser(name, email, password) {
    // basic validation + uniqueness
    if (!name || !email || !password) return false;
    if (users.some(u => u.email === email)) return false;
    const newUser = { name, email, password, role: 'Customer' };
    users.push(newUser);
    saveUsers();
    return true;
}

function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert('Invalid credentials');
        return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.email === "admin@beautylab.com") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "profile.html";
    }
}

// render and update profile
function renderProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-contact').textContent = user.contact || '';
    document.getElementById('profile-address').textContent = user.address || '';
    // load order history from localStorage cart as a placeholder
    const orders = JSON.parse(localStorage.getItem('beautyCart')) || [];
    const list = document.getElementById('orders-list');
    if (list) {
        list.innerHTML = '';
        orders.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} ×${item.quantity} ($${item.price})`;
            list.appendChild(li);
        });
    }
}

function enableProfileEditing() {
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        document.getElementById('profile-edit').style.display = 'block';
    });
    const editForm = document.getElementById('edit-form');
    if (editForm) {
        editForm.addEventListener('submit', e => {
            e.preventDefault();
            const contact = document.getElementById('contact').value;
            const address = document.getElementById('address').value;
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (user) {
                user.contact = contact;
                user.address = address;
                localStorage.setItem('currentUser', JSON.stringify(user));
                const ix = users.findIndex(u => u.email === user.email);
                if (ix > -1) {
                    users[ix] = user;
                    saveUsers();
                }
                renderProfile();
                document.getElementById('profile-edit').style.display = 'none';
            }
        });
    }
}

function addPasswordChangeHandler() {
    const pwForm = document.getElementById('password-form');
    if (!pwForm) return;
    pwForm.addEventListener('submit', e => {
        e.preventDefault();
        const oldPass = document.getElementById('old-pass').value;
        const newPass = document.getElementById('new-pass').value;
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.password === oldPass) {
            user.password = newPass;
            localStorage.setItem('currentUser', JSON.stringify(user));
            const ix = users.findIndex(u => u.email === user.email);
            if (ix > -1) {
                users[ix].password = newPass;
                saveUsers();
            }
            alert('Password changed');
            pwForm.reset();
        } else {
            alert('Current password incorrect');
        }
    });
}

// form handlers
window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginUser(email, password);
        });
    }

    const regForm = document.getElementById('register-form');
    if (regForm) {
        regForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (registerUser(name, email, password)) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed (maybe email already used)');
            }
        });
    }

    // if on profile page, render and wire handlers
    if (document.getElementById('profile-info')) {
        renderProfile();
        enableProfileEditing();
        addPasswordChangeHandler();
    }
});