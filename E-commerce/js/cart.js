let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const subtotal = document.querySelector('.subtotal');
    const totalAmount = document.querySelector('.total-amount');
    const cartCount = document.querySelector('.cart-count');
    const cartContent = document.querySelector('.cart-content');

    if (!cart.length) {
        cartContent.innerHTML = `
            <div class="empty-cart-message">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="products.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        cartCount.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>$${item.discountPrice}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');

    const subtotalAmount = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    totalAmount.textContent = `$${(subtotalAmount + 5).toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Add a continue shopping button
    cartItems.insertAdjacentHTML('beforeend', `
        <div class="cart-actions">
            <a href="products.html" class="continue-shopping">Continue Shopping</a>
        </div>
    `);
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});
