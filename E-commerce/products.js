// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        category: "electronics",
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://picsum.photos/id/1/300/200",
        originalPrice: 199.99,
        discountPrice: 149.99
    },
    {
        id: 2,
        title: "Cotton T-Shirt",
        category: "clothing",
        description: "Comfortable cotton t-shirt in various colors",
        image: "https://picsum.photos/id/2/300/200",
        originalPrice: 29.99,
        discountPrice: 19.99
    },
    {
        id: 3,
        title: "Programming Book",
        category: "books",
        description: "Learn programming with this comprehensive guide",
        image: "https://picsum.photos/id/3/300/200",
        originalPrice: 49.99,
        discountPrice: 39.99
    }
    // Add more products as needed
];

// Function to render products
function renderProducts(productsToRender) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="original-price">$${product.originalPrice}</span>
                        <span class="discount-price">$${product.discountPrice}</span>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Initialize page with all products
renderProducts(products);

// Add click event listeners to category buttons
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.dataset.category;
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        renderProducts(filteredProducts);
    });
});
