
// ======================= Route Protection =======================
const protectedPages = ["cart.html", "profile.html", "wishlist.html"];
const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage) && localStorage.getItem("isLoggedIn") !== "true") {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initNewsletterForm();
    initLanguageSelector();
    
    // Load dynamic content
    loadFeaturedBooks();
    loadLatestReleases();
    loadUpcomingEvents();
});

// Navigation menu functionality
function initNavigation() {
    // Mobile menu toggle (for future implementation)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
    
    // Highlight current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Newsletter subscription functionality
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Language selector functionality
function initLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // In a real application, this would change the site language
            showNotification(`Language changed to ${selectedLanguage}`, 'info');
        });
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Display notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to the DOM
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Handle search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBar) {
        searchBar.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm.length > 0) {
                // In a real app, this would redirect to search results page
                window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
            } else {
                showNotification('Please enter a search term', 'warning');
            }
        });
    }
});

// Create a simple animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition');
});

// Add CSS for notifications
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: #333;
            color: white;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            background-color: #4CAF50;
        }
        
        .notification.error {
            background-color: #F44336;
        }
        
        .notification.warning {
            background-color: #FF9800;
        }
        
        .notification.info {
            background-color: #2196F3;
        }
        
        .page-transition {
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
