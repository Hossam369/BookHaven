// Catalog page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize catalog components
    initializeFilters();
    initializePriceSlider();
    initializeViewToggle();
    initializeSorting();
    
    // Load books data
    loadCatalogBooks();
});

// Sample catalog books data (in a real app, this would come from an API)
const catalogBooksData = [
    {
        id: 1,
        title: "The Silent Echo",
        author: "Emily Richards",
        cover: "img/book-8.png",
        price: "$19.99",
        originalPrice: "$24.99",
        rating: 4.5,
        genre: ["Fiction", "Mystery", "Thriller"],
        format: ["Hardcover", "eBook", "Audiobook"],
        publisher: "Harbor Press",
        description: "A thrilling mystery that follows detective Sarah Miles as she uncovers secrets in a small town."
    },
    {
        id: 2,
        title: "Beyond the Horizon",
        author: "Michael Chen",
        cover: "img/book-4.png",
        price: "$21.99",
        originalPrice: "$27.99",
        rating: 4.8,
        genre: ["Science Fiction", "Adventure"],
        format: ["Hardcover", "Paperback", "eBook"],
        publisher: "Penguin Random House",
        description: "An epic journey through space and time, exploring the boundaries of human potential."
    },
    {
        id: 3,
        title: "Whispers in the Wind",
        author: "Sophia Johnson",
        cover: "img/book-3.png",
        price: "$17.50",
        originalPrice: "$22.99",
        rating: 4.3,
        genre: ["Romance", "Drama", "Fiction"],
        format: ["Paperback", "eBook"],
        publisher: "HarperCollins",
        description: "A moving love story set against the backdrop of 1940s rural America."
    },
    {
        id: 4,
        title: "The Forgotten Path",
        author: "Daniel Williams",
        cover: "img/home-book-4.png",
        price: "$23.99",
        originalPrice: "$29.99",
        rating: 4.6,
        genre: ["Fantasy", "Adventure"],
        format: ["Hardcover", "Audiobook"],
        publisher: "Macmillan Publishers",
        description: "A young hero discovers a hidden realm and his own magical abilities in this fantasy adventure."
    },
    {
        id: 5,
        title: "Midnight Shadows",
        author: "Olivia Bennett",
        cover: "img/book-5.png",
        price: "$18.99",
        originalPrice: "$23.99",
        rating: 4.7,
        genre: ["Thriller", "Mystery", "Suspense"],
        format: ["Paperback", "eBook", "Audiobook"],
        publisher: "Harbor Press",
        description: "A psychological thriller that will keep you on the edge of your seat until the very last page."
    },
    {
        id: 6,
        title: "The Economics of Tomorrow",
        author: "Robert Thompson",
        cover: "img/book-6.png",
        price: "$24.99",
        originalPrice: "$29.99",
        rating: 4.4,
        genre: ["Non-Fiction", "Economics", "Business"],
        format: ["Hardcover", "eBook"],
        publisher: "Penguin Random House",
        description: "An insightful analysis of future economic trends and their impact on global society."
    },
    {
        id: 7,
        title: "Flavors of the Mediterranean",
        author: "Maria Garcia",
        cover: "img/book-7.png",
        price: "$29.99",
        originalPrice: "$34.99",
        rating: 4.9,
        genre: ["Cookbook", "Food", "Non-Fiction"],
        format: ["Hardcover"],
        publisher: "HarperCollins",
        description: "Discover authentic Mediterranean recipes handed down through generations."
    },
    {
        id: 8,
        title: "The Code Breaker",
        author: "James Wilson",
        cover: "img/book-8.png",
        price: "$20.50",
        originalPrice: "$25.99",
        rating: 4.2,
        genre: ["Non-Fiction", "Biography", "History"],
        format: ["Paperback", "eBook", "Audiobook"],
        publisher: "Macmillan Publishers",
        description: "The fascinating story of a cryptographer who changed the course of World War II."
    },
    {
        id: 9,
        title: "Desert Bloom",
        author: "Amelia Carter",
        cover: "img/book-9.png",
        price: "$19.99",
        originalPrice: "$24.99",
        rating: 4.0,
        genre: ["Fiction", "Romance", "Drama"],
        format: ["Paperback", "eBook"],
        publisher: "HarperCollins",
        description: "A story of resilience and love blooming in the most unexpected places."
    },
    {
        id: 10,
        title: "Quantum States",
        author: "Alexander Lee",
        cover: "img/book-10.png",
        price: "$22.99",
        originalPrice: "$27.99",
        rating: 4.6,
        genre: ["Science Fiction", "Thriller"],
        format: ["Hardcover", "eBook", "Audiobook"],
        publisher: "Penguin Random House",
        description: "A mind-bending thriller that explores the boundaries between quantum physics and reality."
    },
    {
        id: 11,
        title: "The Last Kingdom",
        author: "Victoria Hughes",
        cover: "img/home-book-1.png",
        price: "$21.50",
        originalPrice: "$26.99",
        rating: 4.7,
        genre: ["Fantasy", "Historical Fiction"],
        format: ["Hardcover", "Paperback", "eBook"],
        publisher: "Macmillan Publishers",
        description: "An epic tale of kingdoms at war, ancient magic, and a hero's journey."
    },
    {
        id: 12,
        title: "Modern Architecture",
        author: "Thomas Wright",
        cover: "img/home-book-2.png",
        price: "$34.99",
        originalPrice: "$39.99",
        rating: 4.5,
        genre: ["Non-Fiction", "Art", "Design"],
        format: ["Hardcover"],
        publisher: "Harbor Press",
        description: "A comprehensive guide to modern architectural principles and iconic buildings."
    }
];

// Load books into the catalog
function loadCatalogBooks(filteredBooks) {
    const booksContainer = document.getElementById('books-container');
    
    if (!booksContainer) return;
    
    // Clear existing books
    booksContainer.innerHTML = '';
    
    // Use filtered books if provided, otherwise use all books
    const books = filteredBooks || catalogBooksData;
    
    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = books.length;
    }
    
    // Get current view mode (grid or list)
    const isListView = booksContainer.classList.contains('list-view');
    
    // Generate book cards
    books.forEach(book => {
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
        
        // Different HTML based on view mode
        if (isListView) {
            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}">
                </div>
                <div class="book-info">
                    <div>
                        <h3>${book.title}</h3>
                        <p class="author">by ${book.author}</p>
                        <div class="rating">${starsHTML} (${book.rating})</div>
                        <p class="price">${book.price} <span class="original-price">${book.originalPrice}</span></p>
                        <p class="description">${book.description}</p>
                        <div class="book-details">
                            <span class="detail">Publisher: ${book.publisher}</span>
                            <span class="detail">Format: ${book.format.join(', ')}</span>
                        </div>
                    </div>
                    <div class="book-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="quick-view">Quick View</button>
                    </div>
                </div>
            `;
        } else {
            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}">
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p class="author">by ${book.author}</p>
                    <div class="rating">${starsHTML} (${book.rating})</div>
                    <p class="price">${book.price}</p>
                    <div class="book-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="quick-view">Quick View</button>
                    </div>
                </div>
            `;
        }
        
        // Add click event for book details page
        bookCard.addEventListener('click', function(e) {
            // Don't navigate if clicking on a button
            if (e.target.tagName !== 'BUTTON') {
                window.location.href = `book-details.html?id=${book.id}`;
            }
        });
        
        // Add functionality to buttons
        const addToCartBtn = bookCard.querySelector('.add-to-cart');
        const quickViewBtn = bookCard.querySelector('.quick-view');
        
        addToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(book);
        });
        
        quickViewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showQuickView(book);
        });
        
        booksContainer.appendChild(bookCard);
    });
}

// Initialize filter functionality
function initializeFilters() {
    const filterInputs = document.querySelectorAll('.filter-sidebar input');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    // Clear filters button
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterInputs.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else if (input.type === 'range') {
                    input.value = input.max;
                    const priceValue = document.getElementById('price-value');
                    if (priceValue) {
                        priceValue.textContent = '$' + input.value;
                    }
                }
            });
            
            // Reset to all books
            loadCatalogBooks();
        });
    }
    
    // View more links
    const viewMoreLinks = document.querySelectorAll('.view-more');
    viewMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterGroup = this.closest('.filter-group');
            const hiddenOptions = filterGroup.querySelectorAll('.filter-option.hidden');
            
            hiddenOptions.forEach(option => {
                option.classList.remove('hidden');
            });
            
            this.style.display = 'none';
        });
    });
    
    // Mobile filter toggle
    const body = document.body;
    const filterToggleBtn = document.createElement('button');
    filterToggleBtn.classList.add('filter-toggle-btn');
    filterToggleBtn.innerHTML = '<i class="fas fa-filter"></i>';
    body.appendChild(filterToggleBtn);
    
    filterToggleBtn.addEventListener('click', function() {
        const filterSidebar = document.querySelector('.filter-sidebar');
        filterSidebar.classList.toggle('show');
        
        // Close button for mobile filter
        if (filterSidebar.classList.contains('show')) {
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-filter-btn');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '15px';
            closeBtn.style.right = '15px';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.fontSize = '1.5rem';
            closeBtn.style.cursor = 'pointer';
            
            closeBtn.addEventListener('click', function() {
                filterSidebar.classList.remove('show');
                this.remove();
            });
            
            filterSidebar.appendChild(closeBtn);
        }
    });
}

// Filter books based on selected filters
function applyFilters() {
    // Get filter values
    const selectedGenres = getSelectedValues('genre');
    const selectedFormats = getSelectedValues('format');
    const selectedPublishers = getSelectedValues('publisher');
    const selectedRating = getSelectedValue('rating');
    const maxPrice = document.getElementById('price-slider')?.value || 100;
    
    // Filter books
    const filteredBooks = catalogBooksData.filter(book => {
        // Filter by price
        const bookPrice = parseFloat(book.price.replace('$', ''));
        if (bookPrice > maxPrice) return false;
        
        // Filter by genre
        if (selectedGenres.length > 0) {
            const hasMatchingGenre = book.genre.some(genre => 
                selectedGenres.includes(genre.toLowerCase())
            );
            if (!hasMatchingGenre) return false;
        }
        
        // Filter by format
        if (selectedFormats.length > 0) {
            const hasMatchingFormat = book.format.some(format => 
                selectedFormats.includes(format.toLowerCase())
            );
            if (!hasMatchingFormat) return false;
        }
        
        // Filter by publisher
        if (selectedPublishers.length > 0) {
            const publisherValue = getPublisherValue(book.publisher);
            if (!selectedPublishers.includes(publisherValue)) return false;
        }
        
        // Filter by rating
        if (selectedRating) {
            if (book.rating < parseInt(selectedRating)) return false;
        }
        
        return true;
    });
    
    // Load filtered books
    loadCatalogBooks(filteredBooks);
}

// Get selected values from checkboxes with the same name
function getSelectedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Get selected value from radio buttons
function getSelectedValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : null;
}

// Get publisher value from publisher name
function getPublisherValue(publisherName) {
    const publisherMapping = {
        'Harbor Press': 'harbor',
        'Penguin Random House': 'penguin',
        'HarperCollins': 'harpercollins',
        'Macmillan Publishers': 'macmillan'
    };
    
    return publisherMapping[publisherName] || '';
}

// Initialize price slider
function initializePriceSlider() {
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    
    if (priceSlider && priceValue) {
        priceValue.textContent = '$' + priceSlider.value;
        
        priceSlider.addEventListener('input', function() {
            priceValue.textContent = '$' + this.value;
        });
    }
}

// Initialize view toggle (Grid/List)
function initializeViewToggle() {
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const booksContainer = document.getElementById('books-container');
    
    if (gridViewBtn && listViewBtn && booksContainer) {
        gridViewBtn.addEventListener('click', function() {
            booksContainer.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            
            // Reload books with current view
            loadCatalogBooks();
        });
        
        listViewBtn.addEventListener('click', function() {
            booksContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            
            // Reload books with current view
            loadCatalogBooks();
        });
    }
}

// Initialize sorting
function initializeSorting() {
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedBooks = [...catalogBooksData];
            
            switch (sortValue) {
                case 'price_low':
                    sortedBooks.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
                    break;
                case 'price_high':
                    sortedBooks.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
                    break;
                case 'rating':
                    sortedBooks.sort((a, b) => b.rating - a.rating);
                    break;
                case 'popularity':
                    // In a real app, this would be based on sales or views
                    // For demo, we'll randomize
                    sortedBooks.sort(() => Math.random() - 0.5);
                    break;
                case 'newest':
                    // In a real app, this would be based on publication date
                    // For demo, we'll use ID as a proxy for recency
                    sortedBooks.sort((a, b) => b.id - a.id);
                    break;
                default:
                    // 'relevance' is the default, no sorting needed
                    break;
            }
            
            loadCatalogBooks(sortedBooks);
        });
    }
}

// Show quick view modal for a book
function showQuickView(book) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    
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
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <div class="modal-grid">
                <div class="modal-cover">
                    <img src="${book.cover}" alt="${book.title}">
                </div>
                <div class="modal-info">
                    <h2>${book.title}</h2>
                    <p class="author">by ${book.author}</p>
                    <div class="rating">${starsHTML} (${book.rating})</div>
                    <p class="price">${book.price} <span class="original-price">${book.originalPrice}</span></p>
                    <div class="genres">
                        ${book.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                    </div>
                    <p class="description">${book.description}</p>
                    <div class="book-details">
                        <div class="detail"><span>Publisher:</span> ${book.publisher}</div>
                        <div class="detail"><span>Format:</span> ${book.format.join(', ')}</div>
                    </div>
                    <div class="book-actions">
                        <button class="add-to-cart-modal">Add to Cart</button>
                        <a href="book-details.html?id=${book.id}" class="view-details">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 8px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            padding: 30px;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #555;
        }
        
        .modal-grid {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 30px;
        }
        
        .modal-cover img {
            width: 100%;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .modal-info h2 {
            margin-bottom: 5px;
            font-size: 1.8rem;
        }
        
        .modal-info .author {
            margin-bottom: 15px;
            color: #555;
        }
        
        .modal-info .rating {
            color: #f39c12;
            margin-bottom: 15px;
        }
        
        .modal-info .price {
            font-size: 1.4rem;
            font-weight: bold;
            color: #f50057;
            margin-bottom: 15px;
        }
        
        .original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 1rem;
            font-weight: normal;
            margin-left: 10px;
        }
        
        .genres {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        .genre-tag {
            background-color: #f5f5f5;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        
        .description {
            line-height: 1.6;
            margin-bottom: 20px;
            color: #555;
        }
        
        .book-details {
            margin-bottom: 25px;
        }
        
        .detail {
            margin-bottom: 10px;
            color: #555;
        }
        
        .detail span {
            font-weight: bold;
            color: #333;
        }
        
        .book-actions {
            display: flex;
            gap: 15px;
        }
        
        .add-to-cart-modal {
            background-color: #3f51b5;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }
        
        .add-to-cart-modal:hover {
            background-color: #f50057;
        }
        
        .view-details {
            background-color: #f5f5f5;
            color: #333;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 5px;
            font-size: 1rem;
            transition: background-color 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .view-details:hover {
            background-color: #e0e0e0;
        }
        
        @media (max-width: 768px) {
            .modal-grid {
                grid-template-columns: 1fr;
            }
            
            .modal-cover {
                max-width: 200px;
                margin: 0 auto 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Fade in modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Add to cart functionality
    const addToCartBtn = modal.querySelector('.add-to-cart-modal');
    addToCartBtn.addEventListener('click', function() {
        addToCart(book);
    });
}

// Close modal with fade out animation
function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Add book to cart
function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('bookCart') || '[]');
    
    // Check if book is already in cart
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
    let cartCountElement = document.getElementById('cart-count');
    
    // Create cart count element if it doesn't exist
    if (!cartCountElement) {
        const authButtons = document.querySelector('.auth-buttons');
        
        if (authButtons) {
            // Create cart icon and count
            const cartIcon = document.createElement('a');
            cartIcon.href = 'cart.html';
            cartIcon.className = 'cart-icon';
            cartIcon.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-count">0</span>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .cart-icon {
                    position: relative;
                    margin-right: 15px;
                    font-size: 1.2rem;
                    color: var(--text-color);
                }
                
                #cart-count {
                    position: absolute;
                    top: -8px;
                    right: -10px;
                    background-color: var(--secondary-color);
                    color: white;
                    font-size: 0.7rem;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `;
            document.head.appendChild(style);
            
            // Insert before the first auth button
            authButtons.insertBefore(cartIcon, authButtons.firstChild);
            
            // Now get the cart count element
            cartCountElement = document.getElementById('cart-count');
        }
    }
    
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('bookCart') || '[]');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCountElement.textContent = totalItems;
    }
}
