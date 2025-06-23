// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication components
    initPasswordToggles();
    initPasswordStrengthMeter();
    initLoginForm();
    initRegisterForm();
});

// Initialize password visibility toggles
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password strength meter functionality
function initPasswordStrengthMeter() {
    const passwordInput = document.getElementById('password');
    const meterBar = document.querySelector('.meter-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && meterBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update meter bar width and color based on strength
            meterBar.style.width = strength.percentage + '%';
            meterBar.style.backgroundColor = strength.color;
            
            // Update strength text
            strengthText.textContent = 'Password strength: ' + strength.label;
        });
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    // Initialize variables
    let strength = 0;
    let percentage = 0;
    let color = '#eee';
    let label = 'None';
    
    if (password.length === 0) {
        return { percentage, color, label };
    }
    
    // Check password length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    
    // Check for numbers
    if (password.match(/\d/)) strength += 1;
    
    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    
    // Set strength level (0-5)
    switch (strength) {
        case 0:
            percentage = 20;
            color = '#f44336';
            label = 'Very Weak';
            break;
        case 1:
            percentage = 40;
            color = '#ff9800';
            label = 'Weak';
            break;
        case 2:
            percentage = 60;
            color = '#ffeb3b';
            label = 'Fair';
            break;
        case 3:
            percentage = 80;
            color = '#4caf50';
            label = 'Good';
            break;
        case 4:
        case 5:
            percentage = 100;
            color = '#2e7d32';
            label = 'Strong';
            break;
    }
    
    return { percentage, color, label };
}

// Login form validation and submission
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Validate input
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters.', 'error');
                return;
            }
            
            // Simulate login API call
            simulateLoginApi(email, password, rememberMe);
        });
    }
}

// Register form validation and submission
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAgreed = document.getElementById('terms').checked;
            
            // Validate input
            if (firstName.length < 2) {
                showNotification('First name is too short.', 'error');
                return;
            }
            
            if (lastName.length < 2) {
                showNotification('Last name is too short.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (password.length < 8) {
                showNotification('Password must be at least 8 characters.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match.', 'error');
                return;
            }
            
            if (!termsAgreed) {
                showNotification('You must agree to the Terms of Service and Privacy Policy.', 'error');
                return;
            }
            
            // Simulate registration API call
            simulateRegisterApi(firstName, lastName, email, password);
        });
    }
}

// Simulate login API call
function simulateLoginApi(email, password, rememberMe) {
    // Show loading state
    const submitButton = document.querySelector('#login-form button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    
    // Simulate API request delay
    setTimeout(() => {
        // In a real app, this would be an actual API call
        const success = true; // Simulate successful login for demo
        
        if (success) {
            // Store user session
            const user = {
                email: email,
                name: 'Demo User',
                isLoggedIn: true,
                token: 'sample-token-' + Math.random().toString(36).substr(2)
            };
            
            if (rememberMe) {
                // Store in localStorage for persistent login
                localStorage.setItem('bookhavenUser', JSON.stringify(user));
            } else {
                // Store in sessionStorage for session-only login
                sessionStorage.setItem('bookhavenUser', JSON.stringify(user));
            }
            
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Show error message
            showNotification('Invalid email or password. Please try again.', 'error');
        }
    }, 1500);
}

// Simulate registration API call
function simulateRegisterApi(firstName, lastName, email, password) {
    // Show loading state
    const submitButton = document.querySelector('#register-form button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    // Simulate API request delay
    setTimeout(() => {
        // In a real app, this would be an actual API call
        const success = true; // Simulate successful registration for demo
        
        if (success) {
            // Store user data
            const user = {
                email: email,
                name: firstName + ' ' + lastName,
                isLoggedIn: true,
                token: 'sample-token-' + Math.random().toString(36).substr(2)
            };
            
            // Store in localStorage
            localStorage.setItem('bookhavenUser', JSON.stringify(user));
            
            showNotification('Account created successfully! Redirecting...', 'success');
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Show error message
            showNotification('Error creating account. Email may already be in use.', 'error');
        }
    }, 1500);
}

// Check if user is logged in
function isUserLoggedIn() {
    // Check for user data in localStorage or sessionStorage
    const localUser = localStorage.getItem('bookhavenUser');
    const sessionUser = sessionStorage.getItem('bookhavenUser');
    
    if (localUser) {
        return JSON.parse(localUser).isLoggedIn;
    }
    
    if (sessionUser) {
        return JSON.parse(sessionUser).isLoggedIn;
    }
    
    return false;
}

// Get current user data
function getCurrentUser() {
    // Check for user data in localStorage or sessionStorage
    const localUser = localStorage.getItem('bookhavenUser');
    const sessionUser = sessionStorage.getItem('bookhavenUser');
    
    if (localUser) {
        return JSON.parse(localUser);
    }
    
    if (sessionUser) {
        return JSON.parse(sessionUser);
    }
    
    return null;
}

// Log out user
function logoutUser() {
    // Remove user data from storage
    localStorage.removeItem('bookhavenUser');
    sessionStorage.removeItem('bookhavenUser');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Update UI based on authentication state
document.addEventListener('DOMContentLoaded', function() {
    const authButtons = document.querySelector('.auth-buttons');
    
    if (authButtons) {
        if (isUserLoggedIn()) {
            const user = getCurrentUser();
            
            // Replace login/register buttons with user menu
            authButtons.innerHTML = `
                <div class="user-menu">
                    <button class="user-menu-trigger">
                        <span>Welcome, ${user.name.split(' ')[0]}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="user-dropdown">
                        <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
                        <a href="my-books.html"><i class="fas fa-book"></i> My Books</a>
                        <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
                        <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
            
            // Initialize user menu dropdown
            const userMenuTrigger = document.querySelector('.user-menu-trigger');
            const userDropdown = document.querySelector('.user-dropdown');
            
            userMenuTrigger.addEventListener('click', function() {
                userDropdown.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.user-menu')) {
                    userDropdown.classList.remove('show');
                }
            });
            
            // Initialize logout button
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
    }
});

// ======================= Local Storage Auth Logic =======================
function saveLoginState(userId, role = "user") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
}

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function logoutUser() {
    localStorage.clear();
    window.location.href = "login.html";
}

// ======================= Register Function =======================
function registerUser(name, email, password) {
    const user = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));
    alert("Registered successfully!");
    window.location.href = "login.html";
}

// ======================= Login Function =======================
function loginUser(email, password) {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
        alert("Incorrect email or password.");
        return;
    }

    saveLoginState(storedUser.email);
    alert("Login successful!");
    window.location.href = "index.html";
}
