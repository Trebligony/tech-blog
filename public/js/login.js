const loginHandler = async (event) => {
    event.preventDefault();

    // Collect values from login form
    const email = document.querySelector('#log-in-email').value.trim();
    const password = document.querySelector('#log-in-password').value.trim();

    if (email && password) {
        // Send POST request
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json '},
        });

        if (response.ok) {
            // If successful, redirect to the dashboard
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signUpHandler = async (event) => {
    event.preventDefault();

    // Collect values from sign up form
    const name = document.querySelector('#sign-up-name-input').value.trim();
    const email = document.querySelector('#sign-up-email-input').value.trim();
    const password = document.querySelector('#sign-up-password-input').value.trim();

    if (name && email && password) {
        // Send POST request
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect to the dashboard
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

// Initiate signUpHandler function when sign up form submitted
document.querySelector('.sign-up-form').addEventListener('submit', signUpHandler);

// Initiate loginHandler function when log in form submitted
document.querySelector('.log-in-form').addEventListener('submit', loginHandler);