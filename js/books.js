// Sample book data (in a real application, this would come from an API or database)
const bookData = {
    featuredBooks: [
        {
            id: 1,
            title: "The Silent Echo",
            author: "Emily Richards",
            cover: "img/book-1.png",
            price: "$19.99",
            rating: 4.5,
            genre: ["Fiction", "Mystery"],
            description: "A thrilling mystery that follows detective Sarah Miles as she uncovers secrets in a small town."
        },
        {
            id: 2,
            title: "Beyond the Horizon",
            author: "Michael Chen",
            cover: "img/book-2.png",
            price: "$21.99",
            rating: 4.8,
            genre: ["Science Fiction", "Adventure"],
            description: "An epic journey through space and time, exploring the boundaries of human potential."
        },
        {
            id: 3,
            title: "Whispers in the Wind",
            author: "Sophia Johnson",
            cover: "img/book-3.png",
            price: "$17.50",
            rating: 4.3,
            genre: ["Romance", "Drama"],
            description: "A moving love story set against the backdrop of 1940s rural America."
        },
        {
            id: 4,
            title: "The Forgotten Path",
            author: "Daniel Williams",
            cover: "img/book-4.png",
            price: "$23.99",
            rating: 4.6,
            genre: ["Fantasy", "Adventure"],
            description: "A young hero discovers a hidden realm and his own magical abilities in this fantasy adventure."
        }
    ],
    latestReleases: [
        {
            id: 5,
            title: "Midnight Shadows",
            author: "Olivia Bennett",
            cover: "img/book-5.png",
            price: "$18.99",
            rating: 4.7,
            genre: ["Thriller", "Suspense"],
            description: "A psychological thriller that will keep you on the edge of your seat until the very last page."
        },
        {
            id: 6,
            title: "The Economics of",
            author: "Robert Thompson",
            cover: "img/book-6.png",
            price: "$24.99",
            rating: 4.4,
            genre: ["Non-Fiction", "Economics"],
            description: "An insightful analysis of future economic trends and their impact on global society."
        },
        {
            id: 7,
            title: "Flavors of the",
            author: "Maria Garcia",
            cover: "img/book-7.png",
            price: "$29.99",
            rating: 4.9,
            genre: ["Cookbook", "Food"],
            description: "Discover authentic Mediterranean recipes handed down through generations."
        },
        {
            id: 8,
            title: "The Code Breaker",
            author: "James Wilson",
            cover: "img/book-8.png",
            price: "$20.50",
            rating: 4.2,
            genre: ["Non-Fiction", "Biography"],
            description: "The fascinating story of a cryptographer who changed the course of World War II."
        }
    ]
};

// Sample events data
const eventsData = [
    {
        id: 1,
        title: "Book Signing: Emily Richards",
        date: "June 15, 2025",
        time: "3:00 PM - 5:00 PM",
        location: "Main Street Bookstore, New York",
        image: "img/home-book-3.png",
        description: "Meet bestselling author Emily Richards as she signs copies of her new thriller 'The Silent Echo'."
    },
    {
        id: 2,
        title: "Author Interview: Michael Chen",
        date: "June 20, 2025",
        time: "7:00 PM - 8:30 PM",
        location: "Virtual Event (Zoom)",
        image: "img/home-book-1.png",
        description: "Join us for a live interview with science fiction author Michael Chen about his creative process."
    },
    {
        id: 3,
        title: "Book Club Discussion: Whispers in the Wind",
        date: "June 25, 2025",
        time: "6:00 PM - 7:30 PM",
        location: "City Library, Boston",
        image: "img/home-book-2.png",
        description: "Our monthly book club will be discussing Sophia Johnson's award-winning novel."
    }
];

// Load featured books into the page
function loadFeaturedBooks() {
    const featuredBooksContainer = document.getElementById('featured-books-container');
    
    if (featuredBooksContainer) {
        bookData.featuredBooks.forEach(book => {
            const bookCard = createBookCard(book);
            featuredBooksContainer.appendChild(bookCard);
        });
    }
}

// Load latest releases into the page
function loadLatestReleases() {
    const latestReleasesContainer = document.getElementById('latest-releases-container');
    
    if (latestReleasesContainer) {
        bookData.latestReleases.forEach(book => {
            const bookCard = createBookCard(book);
            latestReleasesContainer.appendChild(bookCard);
        });
    }
}

// Load upcoming events into the page
function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('events-container');
    
    if (eventsContainer) {
        eventsData.forEach(event => {
            const eventCard = createEventCard(event);
            eventsContainer.appendChild(eventCard);
        });
    }
}

// Create a book card element
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-book-id', book.id);
    
    // Generate star rating HTML
    const fullStars = Math.floor(book.rating);
    const halfStar = book.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    // Populate book card HTML
    bookCard.innerHTML = `
        <div class="book-cover">
            <img src="${book.cover}" alt="${book.title}">
        </div>
        <div class="book-info">
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <p class="price">${book.price}</p>
            <div class="rating">${starsHTML} (${book.rating})</div>
        </div>
    `;
    
    // Add click event to view book details
    bookCard.addEventListener('click', function() {
        window.location.href = `book-details.html?id=${book.id}`;
    });
    
    return bookCard;
}

// Create an event card element
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.setAttribute('data-event-id', event.id);
    
    eventCard.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.title}">
        </div>
        <div class="event-info">
            <p class="event-date">${event.date} • ${event.time}</p>
            <h3>${event.title}</h3>
            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            <p>${event.description}</p>
            <a href="event-details.html?id=${event.id}" class="btn">Learn More</a>
        </div>
    `;
    
    return eventCard;
}

// Search functionality
function searchBooks(query) {
    // Combine all books for searching
    const allBooks = [...bookData.featuredBooks, ...bookData.latestReleases];
    
    // Filter books based on search query
    return allBooks.filter(book => {
        const searchTerm = query.toLowerCase();
        return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
            book.description.toLowerCase().includes(searchTerm)
        );
    });
}

// Function to load book details on a book details page
function loadBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));
    
    if (bookId) {
        // Find the book in our data
        const allBooks = [...bookData.featuredBooks, ...bookData.latestReleases];
        const book = allBooks.find(b => b.id === bookId);
        
        if (book) {
            // Update page elements with book details
            const bookDetailsContainer = document.getElementById('book-details-container');
            if (bookDetailsContainer) {
                // Generate star rating HTML
                const fullStars = Math.floor(book.rating);
                const halfStar = book.rating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                
                let starsHTML = '';
                for (let i = 0; i < fullStars; i++) {
                    starsHTML += '<i class="fas fa-star"></i>';
                }
                if (halfStar) {
                    starsHTML += '<i class="fas fa-star-half-alt"></i>';
                }
                for (let i = 0; i < emptyStars; i++) {
                    starsHTML += '<i class="far fa-star"></i>';
                }
                
                bookDetailsContainer.innerHTML = `
                    <div class="book-details-grid">
                        <div class="book-details-cover">
                            <img src="${book.cover}" alt="${book.title}">
                        </div>
                        <div class="book-details-info">
                            <h1>${book.title}</h1>
                            <p class="author">by <a href="author.html?name=${encodeURIComponent(book.author)}">${book.author}</a></p>
                            <div class="rating">${starsHTML} (${book.rating})</div>
                            <p class="price">${book.price}</p>
                            <div class="genres">
                                ${book.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                            </div>
                            <p class="description">${book.description}</p>
                            <div class="book-actions">
                                <button class="btn add-to-cart-btn">Add to Cart</button>
                                <button class="btn bookmark-btn"><i class="far fa-bookmark"></i> Bookmark</button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add functionality to the buttons
                const addToCartBtn = bookDetailsContainer.querySelector('.add-to-cart-btn');
                const bookmarkBtn = bookDetailsContainer.querySelector('.bookmark-btn');
                
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', function() {
                        addToCart(book);
                    });
                }
                
                if (bookmarkBtn) {
                    bookmarkBtn.addEventListener('click', function() {
                        toggleBookmark(book);
                        this.innerHTML = isBookmarked(book.id) 
                            ? '<i class="fas fa-bookmark"></i> Bookmarked' 
                            : '<i class="far fa-bookmark"></i> Bookmark';
                    });
                    
                    // Update button state based on bookmark status
                    if (isBookmarked(book.id)) {
                        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
                    }
                }
            }
        }
    }
}

// Shopping cart functionality
function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('bookCart') || '[]');
    
    // Check if the book is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === book.id);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            cover: book.cover,
            quantity: 1
        });
    }
    
    localStorage.setItem('bookCart', JSON.stringify(cart));
    showNotification('Book added to your cart!', 'success');
    
    // Update cart count in the UI
    updateCartCount();
}

// Update cart count in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('bookCart') || '[]');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Bookmark functionality
function toggleBookmark(book) {
    let bookmarks = JSON.parse(localStorage.getItem('bookBookmarks') || '[]');
    
    const bookmarkIndex = bookmarks.findIndex(b => b.id === book.id);
    
    if (bookmarkIndex >= 0) {
        // Remove bookmark
        bookmarks.splice(bookmarkIndex, 1);
        showNotification('Book removed from your bookmarks', 'info');
    } else {
        // Add bookmark
        bookmarks.push({
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover
        });
        showNotification('Book added to your bookmarks!', 'success');
    }
    
    localStorage.setItem('bookBookmarks', JSON.stringify(bookmarks));
}

// Check if a book is bookmarked
function isBookmarked(bookId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookBookmarks') || '[]');
    return bookmarks.some(bookmark => bookmark.id === bookId);
}

// Initialize book-related functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    updateCartCount();
    
    // Check if we're on the book details page
    if (window.location.pathname.includes('book-details.html')) {
        loadBookDetails();
    }
    
    // Check if we're on the search results page
    if (window.location.pathname.includes('search-results.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
        
        if (searchQuery) {
            displaySearchResults(searchQuery);
        }
    }
});
