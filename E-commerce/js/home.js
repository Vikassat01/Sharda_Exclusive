// Load cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    // In a real app, this would send the email to a server
    alert(`Thank you for subscribing with ${email}!`);
    event.target.reset();
}

// Load trending products
async function loadTrendingProducts() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        const trendingProducts = data.products.slice(0, 4); // Show first 4 products

        const productSlider = document.querySelector('.product-slider');
        productSlider.innerHTML = trendingProducts.map(product => `
            <div class="product-card">
                <img src="${getImageUrl(product)}" 
                     alt="${product.title}" 
                     class="product-image"
                     onerror="this.src='https://picsum.photos/300/200?random=${product.id}'">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="discount-price">$${product.discountPrice}</span>
                    </div>
                    <a href="products.html" class="view-btn">View Details</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading trending products:', error);
        const productSlider = document.querySelector('.product-slider');
        productSlider.innerHTML = '<p class="error">Failed to load trending products</p>';
    }
}

// Helper function for image URLs
function getImageUrl(product) {
    const category = product.category;
    const title = product.title.toLowerCase().replace(/\s+/g, '-');
    
    try {
        return productImages[category][title] || 
               `https://picsum.photos/seed/${category}/300/200`;
    } catch {
        return `https://picsum.photos/seed/${title}/300/200`;
    }
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadTrendingProducts();
    
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});
