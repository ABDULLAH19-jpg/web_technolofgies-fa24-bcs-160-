// ======================================
// MIDTERM TASK 3: PRODUCT FUNCTIONALITY
// ======================================

// Get HTML elements
const searchInput = document.getElementById("product-search");
const sortButton = document.getElementById("sort-price");
const productGrid = document.getElementById("product-grid");
const noProductsMessage = document.getElementById("no-products");

// Get all product cards
const productCards = Array.from(
    productGrid.querySelectorAll(".col")
);

// Exam values
const N = 60;
const premiumThreshold = N * 100;

// Sorting direction
let ascending = true;


// ======================================
// FUNCTION 1: GET PRODUCT PRICE
// ======================================

function getPrice(card) {

    const priceText = card.querySelector(".product-info p").textContent;

    // Remove Rs., commas and other non-numeric characters
    const price = Number(priceText.replace(/[^\d]/g, ""));

    return price;
}


// ======================================
// FUNCTION 2: ADD PREMIUM LABELS
// ======================================

productCards.forEach(function(card) {

    const price = getPrice(card);

    if (price > premiumThreshold) {

        const premiumLabel = document.createElement("span");

        premiumLabel.className = "premium-label";
        premiumLabel.textContent = "Premium";

        card.querySelector(".product-info").prepend(premiumLabel);
    }

});


// ======================================
// FUNCTION 3: SEARCH + CATEGORY FILTER
// ======================================

function filterProducts() {

    // Get search text
    const searchText = searchInput.value.toLowerCase().trim();

    // Find selected category
    const selectedCategory = document.querySelector(
        'input[name="category"]:checked'
    ).id;

    let visibleCount = 0;

    productCards.forEach(function(card) {

        // Get product name
        const productName = card.querySelector(
            ".product-info h5"
        ).textContent.toLowerCase();

        // Get product category
        const productCategory = card.dataset.category;

        // Check search match
        const matchesSearch = productName.includes(searchText);

        // Check category match
        let matchesCategory = true;

        if (selectedCategory === "filter-unstitched") {
            matchesCategory = productCategory === "unstitched";
        }

        else if (selectedCategory === "filter-ready") {
            matchesCategory = productCategory === "ready";
        }

        else if (selectedCategory === "filter-accessories") {
            matchesCategory = productCategory === "accessories";
        }

        // Display only matching products
        const shouldShow = matchesSearch && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }

    });

    // Show message when no products match
    noProductsMessage.hidden = visibleCount !== 0;

    // Hide the entire grid when no products match
    productGrid.hidden = visibleCount === 0;
}


// ======================================
// FUNCTION 4: SEARCH EVENT
// ======================================

searchInput.addEventListener("input", function() {

    filterProducts();

});


// ======================================
// FUNCTION 5: CATEGORY FILTER EVENT
// ======================================

const categoryFilters = document.querySelectorAll(
    'input[name="category"]'
);

categoryFilters.forEach(function(filter) {

    filter.addEventListener("change", function() {

        filterProducts();

    });

});


// ======================================
// FUNCTION 6: SORT PRODUCTS BY PRICE
// ======================================

sortButton.addEventListener("click", function() {

    // Sort existing product cards
    productCards.sort(function(a, b) {

        const priceA = getPrice(a);
        const priceB = getPrice(b);

        if (ascending) {
            return priceA - priceB;
        }

        return priceB - priceA;

    });

    // Move existing cards into sorted order
    productCards.forEach(function(card) {

        productGrid.appendChild(card);

    });

    // Toggle sorting direction
    ascending = !ascending;

    // Update button text
    if (ascending) {

        sortButton.textContent = "SORT BY PRICE: LOW TO HIGH";

    } else {

        sortButton.textContent = "SORT BY PRICE: HIGH TO LOW";

    }

    // Keep current search and category filters active
    filterProducts();

});


// ======================================
// INITIALIZE PRODUCTS
// ======================================

filterProducts();