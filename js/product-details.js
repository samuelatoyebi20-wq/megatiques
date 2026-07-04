const API = "http://localhost:3000/api";

// Get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {

    if (!productId) {

        document.querySelector(".product-page").innerHTML =
        "<h2>Product not found.</h2>";

        return;

    }

    try {

        const response = await fetch(
            `${API}/products/${productId}`
        );

        const product = await response.json();

        const allProducts =
        await fetch(`${API}/products`);

        const products =
        await allProducts.json();

        document.getElementById("product-name").textContent =
        product.name;

        document.getElementById("product-price").textContent =
        "₦" + Number(product.price).toLocaleString();

        document.getElementById("product-description").textContent =
        product.description;

        document.getElementById("product-stock").textContent =
product.stock > 0
? `${product.stock} in stock`
: "Out of stock";


        document.getElementById("product-image").src =
        product.image;

        const gallery =
        document.getElementById(
        "thumbnail-gallery"
        );

        gallery.innerHTML = "";

        const images = [

        product.image,

        ...(product.gallery || [])

        ];

        images.forEach(image=>{

        gallery.innerHTML += `

        <img
        src="${image}"
        onclick="changeImage('${image}')">

        `;

        });

        // Add to Cart button

        document.getElementById("addCartBtn").onclick =
function(){

const quantity =
Number(
document.getElementById("qty").value
);

for(let i=0;i<quantity;i++){

addToCart(
product.name,
product.price,
product.image
);

}

alert(
`${quantity} item(s) added to cart`
);

};

        document.getElementById("buyNowBtn").onclick =
function(){

const quantity =
document.getElementById("qty").value;

const total =
product.price * quantity;

const message =

`Hello MEGATIQUES,

I would like to order:

Product:
${product.name}

Quantity:
${quantity}

Unit Price:
₦${product.price.toLocaleString()}

Total:
₦${total.toLocaleString()}

Product Link:
${window.location.href}`;

window.open(

`https://wa.me/2348058563790?text=${encodeURIComponent(message)}`

);

};

    const related =
    document.getElementById(
    "related-products"
    );

    related.innerHTML = "";

    products

    .filter(p=>

    p.category===product.category &&

    p._id!==product._id

    )

    .slice(0,4)

    .forEach(item=>{

    related.innerHTML += `

    <a href="product.html?id=${item._id}">

    <img src="${item.image}">

    <h3>

    ${item.name}

    </h3>

    <p>

    ₦${item.price.toLocaleString()}

    </p>

    </a>

    `;

    });

    }

    catch (error) {

        console.error(error);

        document.querySelector(".product-page").innerHTML =
        "<h2>Unable to load product.</h2>";

    }

}

loadProduct();

function changeQty(value){

const input =
document.getElementById("qty");

let qty =
Number(input.value);

qty += value;

if(qty<1)
qty=1;

input.value=qty;

}

function changeImage(image){

document.getElementById(
"product-image"
).src = image;

}