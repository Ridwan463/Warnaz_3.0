// Define constants for Airtable API
const AIRTABLE_API_URL = "https://api.airtable.com/v0/appUfE3DkXdOG1WWl/Products"; // Replace with your table name
const AIRTABLE_API_KEY = "patRjR2YbP63PimSQ.a080853a1df62ddd1fe1dc9889dbb635813078c9c5986885d60bafd080455aec"; // Your API key

// Get the product list container from the HTML
const productList = document.getElementById("product-list");

// Function to fetch products from Airtable
async function fetchProducts() {
    try {
        productList.innerHTML = "<p>Loading products...</p>"; // Show loading message

        const response = await fetch(AIRTABLE_API_URL, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}` // Include your API key in headers
            }
        });

        // Check if the response is successful
        if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);

        const data = await response.json(); // Parse JSON response
        console.log("Airtable Data:", data); // Debugging: Check the API response structure
        displayProducts(data.records); // Airtable returns data in "records"
    } catch (error) {
        console.error("Error fetching products:", error);
        productList.innerHTML = `<p>Error: ${error.message}. Check the console for details.</p>`;
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    if (!products.length) {
        productList.innerHTML = "<p>No products available.</p>";
        return;
    }

    productList.innerHTML = ""; // Clear previous content

    products.forEach(product => {
        const fields = product.fields; // Access the fields of the record
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${fields.imageUrl || 'https://via.placeholder.com/150'}" alt="${fields.name}">
            <h3>${fields.name}</h3>
            <p>Price: $${fields.price}</p>
        `;
        productList.appendChild(productCard);
    });
}
async function fetchProducts() {
    try {
        productList.innerHTML = "<p>Loading products...</p>"; // Loading message

        const response = await fetch(AIRTABLE_API_URL, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}` // Include your API key in headers
            }
        });

        if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`); // Handle errors

        const data = await response.json(); // Parse JSON response
        console.log("Airtable Data:", data); // Debugging: Check API response
        displayProducts(data.records); // Pass records to display function
    } catch (error) {
        console.error("Error fetching products:", error);
        productList.innerHTML = `<p>Error: ${error.message}. Check console for details.</p>`;
    }
}

function displayProducts(products) {
    if (!products.length) {
        productList.innerHTML = "<p>No products available.</p>";
        return;
    }

    productList.innerHTML = ""; // Clear previous content

    products.forEach(record => {
        const fields = record.fields; // Access the fields of the record
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${fields.imageUrl || 'https://via.placeholder.com/150'}" alt="${fields.name || 'Product'}">
            <h3>${fields.name || 'Unnamed Product'}</h3>
            <p>Price: $${fields.price || 'N/A'}</p>
        `;

        productList.appendChild(productCard);
    });
}


// Load products when the page loads
fetchProducts();
