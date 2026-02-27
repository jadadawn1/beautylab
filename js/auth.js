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
});