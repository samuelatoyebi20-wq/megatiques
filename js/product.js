const params = new URLSearchParams(window.location.search);
const slug = params.get("category");

// ===========================
// LOAD COLLECTION
// ===========================

async function loadCollection() {

    if (!slug) return;

    // Load collection details
    const categoryRes = await fetch(`${API}/categories/${slug}`);

    if (!categoryRes.ok) {

        document.getElementById("collection-title").textContent =
            "Collection Not Found";

        return;
    }

    const category = await categoryRes.json();

    // Update Hero
    document.getElementById("collection-title").textContent =
        category.name;

    document.getElementById("collection-heading").textContent =
        category.name;

    document.getElementById("collection-description").textContent =
        category.description;

    document.getElementById("collection-banner").src =
        category.banner;

    // Load products
    const productsRes =
        await fetch(`${API}/products`);

    const products =
        await productsRes.json();

    const grid =
        document.getElementById("product-grid");

    grid.innerHTML = "";

    products
        .filter(product => product.category === slug)
        .forEach(product => {

            grid.innerHTML += `

            <a href="product.html?id=${product._id}" class="product-card">

                <img
                    src="${product.image}"
                    class="product-image">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>₦${Number(product.price).toLocaleString()}</p>

                </div>

            </a>

            `;

        });

}


// ===========================
// LOAD OTHER COLLECTIONS
// ===========================

async function loadOtherCollections() {

    const response =
        await fetch(`${API}/categories`);

    const categories =
        await response.json();

    const grid =
        document.getElementById("collections-grid");

    if (!grid) return;

    grid.innerHTML = "";

    categories.forEach(category => {

        if (category.slug === slug) return;

        grid.innerHTML += `

        <a
        href="collection.html?category=${category.slug}"
        class="product-card">

            <img
            src="${category.banner}"
            class="product-image">

            <div class="product-info">

                <h3>${category.name}</h3>

            </div>

        </a>

        `;

    });

}

// ===========================
// INITIAL LOAD
// ===========================

loadCollection();
loadOtherCollections();
