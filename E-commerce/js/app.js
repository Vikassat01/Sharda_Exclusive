const products = [
    {
        id: 1,
        title: "Wireless Earbuds",
        category: "electronics",
        description: "Premium wireless earbuds with noise cancellation",
        image: "https://picsum.photos/id/1/300/200",
        originalPrice: 199.99,
        discountPrice: 149.99
    },
    {
        id: 2,
        title: "Smart Watch",
        category: "electronics",
        description: "Feature-rich smartwatch with health tracking",
        image: "https://picsum.photos/id/2/300/200",
        originalPrice: 299.99,
        discountPrice: 249.99
    },
    // Add more products here
];

function displayProducts(filteredProducts) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="price-info">
                        <span class="original-price">$${product.originalPrice}</span>
                        <span class="discount-price">$${product.discountPrice}</span>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// Initialize with all products
displayProducts(products);

// Add filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        displayProducts(filteredProducts);
    });
});
