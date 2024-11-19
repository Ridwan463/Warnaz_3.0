// Define the product list element
const productList = document.getElementById("product-list");

// Airtable API configuration
const AIRTABLE_API_URL = "https://api.airtable.com/v0/appXXXXXXXXXXXXXX/Table%201"; // Replace with your Base ID and Table Name
const AIRTABLE_API_KEY = "keyXXXXXXXXXXXXXX"; // Replace with your Airtable API Key

// Function to fetch products from Airtable API
async function fetchProducts() {
    try {
        productList.innerHTML = "<p>Loading products...</p>"; // Loading message

        const response = await fetch(AIRTABLE_API_URL, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json(); // Parse JSON response
        displayProducts(data.records); // Pass records to the display function
    } catch (error) {
        console.error("Error fetching products:", error);
        productList.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    productList.innerHTML = ""; // Clear previous content

    products.forEach(product => {
        const productFields = product.fields; // Access fields from Airtable record
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${productFields["Image URL"] || "https://via.placeholder.com/150"}" alt="${productFields.Name}">
            <h3>${productFields.Name}</h3>
            <p>Price: $${productFields.Price}</p>
        `;
        productList.appendChild(productCard);
    });
}

// Load products when the page loads
fetchProducts();
