let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayOrderSummary() {
    const orderItems = document.querySelector('.order-items');
    const summaryDetails = document.querySelector('.summary-details');
    const cartCount = document.querySelector('.cart-count');

    // Update cart count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Display order items
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="order-item-details">
                <h4>${item.title}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>$${(item.discountPrice * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    const shipping = 5;
    const total = subtotal + shipping;

    // Display summary
    summaryDetails.innerHTML = `
        <div class="summary-item">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Shipping:</span>
            <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-item total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

function placeOrder(event) {
    event.preventDefault();

    const orderDetails = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipcode: document.getElementById('zipcode').value
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0) + 5
    };

    // Save order to localStorage (in a real app, this would go to a server)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');
    cart = [];

    // Show success message
    showOrderSuccess();
}

function showOrderSuccess() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <h2><i class="fas fa-check-circle"></i> Order Placed Successfully!</h2>
        <p>Thank you for your order.</p>
        <button onclick="window.location.href='products.html'" class="continue-shopping">
            Continue Shopping
        </button>
    `;
    document.body.appendChild(message);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});
