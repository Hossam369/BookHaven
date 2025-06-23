// cart.js
document.addEventListener('DOMContentLoaded', function () {
    // Sample cart data
    const cartItems = [
        {
            id: 1,
            title: "The Silent Echo",
            author: "Emily Richards",
            cover: "img/discount-book-1.png",
            format: "Paperback",
            price: 14.99,
            quantity: 1
        },
        {
            id: 2,
            title: "Midnight Whispers",
            author: "Jonathan Black",
            cover: "img/discount-book-2.png",
            format: "Hardcover",
            price: 22.99,
            quantity: 2
        }
    ];

    // DOM Elements
    const cartContainer = document.querySelector('.cart-items');
    const summaryContainer = document.querySelector('.cart-summary');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const updateCartBtn = document.querySelector('.update-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const couponInput = document.querySelector('.coupon-input input');
    const applyCouponBtn = document.querySelector('.apply-btn');

    // Render cart items
    function renderCart() {
        cartContainer.innerHTML = `
            <div class="cart-header">
                <div class="header-item product">Product</div>
                <div class="header-item price">Price</div>
                <div class="header-item quantity">Quantity</div>
                <div class="header-item total">Total</div>
                <div class="header-item action">Action</div>
            </div>
        `;

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `
                <div class="item-product">
                    <div class="item-image">
                        <img src="${item.cover}" alt="${item.title}">
                    </div>
                    <div class="item-details">
                        <h3><a href="book-details.html">${item.title}</a></h3>
                        <p class="author">by ${item.author}</p>
                        <p class="format">${item.format}</p>
                    </div>
                </div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    <div class="quantity-selector">
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                    </div>
                </div>
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="item-action">
                    <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Add cart actions
        const cartActions = document.createElement('div');
        cartActions.className = 'cart-actions';
        cartActions.innerHTML = `
            <button class="btn continue-shopping">
                <i class="fas fa-arrow-left"></i> Continue Shopping
            </button>
            <button class="btn update-cart">Update Cart</button>
        `;
        cartContainer.appendChild(cartActions);

        updateSummary();
        setupEventListeners();
    }

    // Update summary section
    function updateSummary() {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.07; // 7% tax
        const total = subtotal + tax;

        summaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-details">
                <div class="summary-row">
                    <span>Subtotal (${cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div class="summary-row">
                    <span>Tax</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>

            <div class="coupon-section">
                <h4>Have a coupon?</h4>
                <div class="coupon-input">
                    <input type="text" placeholder="Enter coupon code">
                    <button class="btn apply-btn">Apply</button>
                </div>
            </div>

            <button class="btn btn-block checkout-btn">Proceed to Checkout</button>

            <div class="secure-checkout">
                <i class="fas fa-lock"></i>
                <span>Secure checkout</span>
            </div>
        `;

        setupEventListeners();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Quantity adjustments
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function () {
                const input = this.nextElementSibling;
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                    updateItemQuantity(input);
                }
            });
        });
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function () {
                const input = this.previousElementSibling;
                input.value = parseInt(input.value) + 1;
                updateItemQuantity(input);
            });
        });

        // Manual quantity input
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function () {
                if (parseInt(this.value) < 1) this.value = 1;
                updateItemQuantity(this);
            });
        });

        // Remove item
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const itemElement = this.closest('.cart-item');
                const itemId = parseInt(itemElement.dataset.id);
                removeItem(itemId);
            });
        });

        // Continue shopping
        const continueShoppingBtn = document.querySelector('.continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', function () {
                window.location.href = 'books.html';
            });
        }

        // Update cart
        const updateCartBtn = document.querySelector('.update-cart');
        if (updateCartBtn) {
            updateCartBtn.addEventListener('click', function () {
                alert('Cart updated successfully!');
            });
        }

        // Apply coupon
        const applyCouponBtn = document.querySelector('.apply-btn');
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const couponCode = document.querySelector('.coupon-input input').value;
                if (couponCode) {
                    // In a real app, you would validate the coupon with your backend
                    alert(`Coupon "${couponCode}" applied successfully!`);
                } else {
                    alert('Please enter a coupon code');
                }
            });
        }

        // Proceed to checkout
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function () {
                if (cartItems.length > 0) {
                    window.location.href = 'checkout.html';
                } else {
                    alert('Your cart is empty!');
                }
            });
        }
    }

    // Update item quantity
    function updateItemQuantity(input) {
        const itemElement = input.closest('.cart-item');
        const itemId = parseInt(itemElement.dataset.id);
        const newQuantity = parseInt(input.value);

        // Update in cart data
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }

        // Update item total
        const itemTotal = itemElement.querySelector('.item-total');
        itemTotal.textContent = `$${(item.price * newQuantity).toFixed(2)}`;

        updateSummary();
    }

    // Remove item from cart
    function removeItem(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);

            // Animate removal
            const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
            itemElement.classList.add('removing');

            setTimeout(() => {
                renderCart();
            }, 300);
        }
    }

    // Initialize cart
    renderCart();
});