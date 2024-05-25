document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const validUsername = 'Admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});
