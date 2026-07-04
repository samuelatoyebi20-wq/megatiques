const API = "http://localhost:3000/api";

async function loadHomepageProducts() {

    const response = await fetch(`${API}/products`);

    const products = await response.json();

    loadSection(
        "featured-products",
        products.filter(product => product.featured)
    );

    loadSection(
        "new-arrivals",
        products.filter(product => product.newArrival)
    );

    loadSection(
        "trending-products",
        products.filter(product => product.trending)
    );

    loadSection(
        "best-sellers",
        products.filter(product => product.bestSeller)
    );

}

function loadSection(containerId, products) {

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = "";

    products.slice(0, 4).forEach(product => {

        html += `

        <a
        href="product.html?id=${product._id}"
        class="product-card">

            <div class="product-image-wrapper">

                <img
                src="${product.image}"
                alt="${product.name}">

            </div>

            <div class="product-info">

                <div class="product-name">

                    ${product.name}

                </div>

                <div class="product-price">

                    ₦${Number(product.price).toLocaleString()}

                </div>

            </div>

        </a>

        `;

    });

    container.innerHTML = html;

}

loadHomepageProducts();

async function loadHomepageCollections() {

    const response = await fetch(`${API}/categories`);
    const categories = await response.json();

    const grid = document.getElementById("collections-grid");

    if (!grid) return;

    grid.innerHTML = "";

    categories.forEach(category => {

        grid.innerHTML += `

        <a href="collection.html?category=${category.slug}" class="product-card">

            <img
                src="${category.banner}"
                alt="${category.name}"
                style="
                    width:100%;
                    height:300px;
                    object-fit:cover;
                    border-radius:10px;
                ">

            <div class="product-info">

                <div class="product-name">

                    ${category.name}

                </div>

            </div>

        </a>

        `;

    });

}

loadHomepageCollections();