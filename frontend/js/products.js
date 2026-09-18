const productsContainer = document.getElementById("products");
const productForm = document.getElementById("productForm");
const message = document.getElementById("message");

const API_URL = "http://13.201.91.218:5000/api/products";


// ==========================
// GET PRODUCTS
// ==========================

function loadProducts() {

    fetch(API_URL)
        .then(response => response.json())
        .then(products => {

            productsContainer.innerHTML = "";

            products.forEach(product => {

                const productDiv = document.createElement("div");

                productDiv.className = "product";

                productDiv.innerHTML = `
                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <p class="price">
                        ₹${product.price}
                    </p>

                    <p class="stock">
                        Stock: ${product.stock}
                    </p>
                `;

                productsContainer.appendChild(productDiv);

            });

        })
        .catch(error => {

            productsContainer.innerHTML =
                "<p>Failed to load products.</p>";

            console.error(error);

        });
}


// ==========================
// ADD PRODUCT
// ==========================

productForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const product = {

        name: document.getElementById("name").value,

        description:
            document.getElementById("description").value,

        price:
            document.getElementById("price").value,

        image:
            document.getElementById("image").value,

        stock:
            document.getElementById("stock").value

    };


    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    })

    .then(response => response.json())

    .then(data => {

        message.innerText = data.message;

        productForm.reset();

        loadProducts();

    })

    .catch(error => {

        message.innerText = "Failed to add product.";

        console.error(error);

    });

});


// Load products when page opens

loadProducts();
