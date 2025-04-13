// Add at the beginning of the file
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Fetch products from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error loading products:', error);
        // Use placeholder products if JSON fails
        return [
            {
                id: 1,
                title: "Wireless Headphones",
                category: "electronics",
                description: "High-quality wireless headphones with noise cancellation",
                image: "https://picsum.photos/seed/headphones/300/200",
                originalPrice: 199.99,
                discountPrice: 149.99
            },
            {
                id: 2,
                title: "Smart Watch",
                category: "electronics",
                description: "Feature-rich smartwatch with health tracking",
                image: "https://picsum.photos/seed/watch/300/200",
                originalPrice: 299.99,
                discountPrice: 249.99
            }
            // More placeholder products can be added here
        ];
    }
}

// Product image URLs mapping
const productImages = {
    electronics: {
        'wireless-headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        'smart-watch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
        'smartphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        'fitness-tracker': 'https://images.unsplash.com/photo-1557858310-9052820906f7'
    },
    clothing: {
        'denim-jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        'running-shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'winter-jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5'
    },
    books: {
        'python-programming': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
        'web-development': 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b'
    }
};

function getImageUrl(product) {
    const category = product.category;
    const title = product.title.toLowerCase().replace(/\s+/g, '-');
    
    try {
        // Try to get specific product image
        return productImages[category][title] || 
               // Fallback to category default
               `https://picsum.photos/seed/${category}/300/200`;
    } catch {
        // Final fallback
        return `https://picsum.photos/seed/${title}/300/200`;
    }
}

function handleImageError(img, product) {
    img.onerror = null;
    // Try fallback category image
    img.src = `./images/${product.category}/default.jpg`;
    // If that fails, use placeholder
    img.onerror = () => {
        img.src = `https://picsum.photos/seed/${product.title}/300/200`;
    };
}

// Add cart functionality
let cart = [];

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            image: getImageUrl(product)  // Save the actual image URL
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation message
    const confirmMessage = document.createElement('div');
    confirmMessage.className = 'cart-confirmation';
    confirmMessage.textContent = 'Added to cart!';
    document.body.appendChild(confirmMessage);
    
    setTimeout(() => {
        confirmMessage.remove();
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${getImageUrl(item)}" alt="${item.title}">
                <div>
                    <h4>${item.title}</h4>
                    <p>$${item.discountPrice} × ${item.quantity}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.discountPrice * (item.quantity || 1)), 0);
        cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function toggleCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.classList.toggle('active');
}

// Function to render products
function renderProducts(productsToRender) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsToRender.length) {
        productsGrid.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${getImageUrl(product)}" 
                     alt="${product.title}" 
                     class="product-image"
                     onerror="handleImageError(this, ${JSON.stringify(product)})">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="original-price">$${product.originalPrice}</span>
                        <span class="discount-price">$${product.discountPrice}</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${JSON.stringify({
                        id: product.id,
                        title: product.title,
                        category: product.category,
                        description: product.description,
                        originalPrice: product.originalPrice,
                        discountPrice: product.discountPrice
                    }).replace(/"/g, '&quot;')})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Initialize page with all products
async function initializePage() {
    const products = await fetchProducts();
    renderProducts(products);

    // Add click event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            renderProducts(filteredProducts);
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            document.querySelector('.nav-links').classList.remove('active');
        }
    });

    updateCartCount();
}

// Start the application
document.addEventListener('DOMContentLoaded', initializePage);