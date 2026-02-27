// Simulated user database
const users = []; 

function registerUser(name, email, password) {
    // Requirements: Form validation and storing in user array [cite: 561, 769]
    const newUser = { name, email, password, role: 'Customer' };
    users.push(newUser);
    return true;
}

function loginUser(email, password) {
    // store simple login flag
    localStorage.setItem('isLoggedIn', 'true');
    // Requirements: Redirect based on role [cite: 550, 758]
    if (email === "admin@beautylab.com") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "profile.html";
    }
}