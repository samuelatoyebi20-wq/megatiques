// =========================
// PRODUCT IMAGE GALLERY
// =========================

function changeImage(image) {

    const mainImage =
        document.getElementById("main-image");

    if (mainImage) {

        mainImage.src = image.src;

    }

}


// =========================
// CART STORAGE
// =========================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// UPDATE CART COUNTER
// =========================

function updateCartCount() {

    let count = cart.length;

    localStorage.setItem(
        "cartCount",
        count
    );

    let counter =
        document.getElementById("cart-count");

    if (counter) {

        counter.textContent = count;

    }

}


// =========================
// ADD TO CART
// =========================

function addToCart(productName, price, image) {

    const existingProduct =
        cart.find(item => item.name === productName);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

        id: Date.now(),

        name: productName,

        price: price,

        image: image,

        quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCheckout();

    alert(productName + " added to cart!");

}


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts() {

    const productGrid =
        document.getElementById("product-grid");

    if (!productGrid || typeof products === "undefined")
        return;

    productGrid.innerHTML = "";

    products.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card">

           <a href="product.html?id=${product._id}">

                <img src="${product.image}"
                     alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₦${product.price.toLocaleString()}</p>

            </a>

        </div>

        `;

    });

}


// =========================
// SINGLE PRODUCT
// =========================

function displaySingleProduct() {

    if (typeof products === "undefined")
        return;

    const productName =
        document.getElementById("product-name");

    if (!productName) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");

    const product =
        products.find(
             p => p._id === id
        );

    if (!product) return;

    document.getElementById(
        "product-name"
    ).textContent = product.name;

    document.getElementById(
        "product-price"
    ).textContent =
        "₦" + product.price.toLocaleString();

    document.getElementById(
        "product-description"
    ).textContent =
        product.description;

    const image =
        document.getElementById("product-image");

    if (image) {

        image.src = product.image;

    }

    document.getElementById(
        "add-cart-btn"
    ).onclick = function () {

        addToCart(
            product.name,
            product.price,
            product.image
        );

    };

}


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    let cartItems =
        document.getElementById("cart-items");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}"
                 alt="${item.name}">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>₦${item.price.toLocaleString()}</p>

                <div class="cart-qty">

                <button
                onclick="changeCartQty(${index},-1)">

                -

                </button>

                <span>

                ${item.quantity}

                </span>

                <button
                onclick="changeCartQty(${index},1)">

                +

                </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

            <div class="cart-total">

                ₦${(
                    item.price * item.quantity
                ).toLocaleString()}

            </div>

        </div>

        `;
    const delivery = total > 0 ? 3000 : 0;

const grandTotal = total + delivery;

    });

    const totalTop =
        document.getElementById("cart-total");

    const totalBottom =
        document.getElementById("cart-total-bottom");

    if (totalTop) {

        totalTop.textContent =
        grandTotal.toLocaleString();
    }

    if (totalBottom) {

        totalBottom.textContent =
        grandTotal.toLocaleString();
    }

    const deliveryFee =
        document.getElementById(
        "delivery-fee"
        );

        if(deliveryFee){

        deliveryFee.textContent =
        delivery.toLocaleString();

        }

}


// =========================
// UPDATE QUANTITY
// =========================

function updateQuantity(index, quantity) {

    cart[index].quantity =
        Number(quantity);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();
    displayCheckout();

}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        updateCartCount();

        displayCart();

        fetchProducts();

        if (typeof searchProducts === "function") {
            searchProducts();
        }

        displayCheckoutTotal();
        displayCheckout();

    }
);

/*link to whatapp*/
function sendOrderToWhatsApp() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");
        return;

    }

    let message =
        "Hello MEGATIQUES,%0A%0AI would like to order:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        message +=
            `${item.name} x${item.quantity} - ₦${itemTotal.toLocaleString()}%0A`;

    });

    message +=
        `%0ATotal: ₦${total.toLocaleString()}`;

    const phoneNumber =
        "2348058563790";

    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
    );

}

// =========================
// CHECKOUT TOTALS
// =========================

function displayCheckout(){

const container =
document.getElementById(
"checkout-items"
);

if(!container) return;

container.innerHTML="";

let subtotal=0;

cart.forEach(item=>{

subtotal +=
item.price * item.quantity;

container.innerHTML += `

<div class="checkout-product">

<div>

<strong>

${item.name}

</strong>

<br>

${item.quantity} × ₦${item.price.toLocaleString()}

</div>

<div>

₦${(item.price*item.quantity).toLocaleString()}

</div>

</div>

`;

});

const delivery =
subtotal>0 ? 3000 : 0;

const total =
subtotal + delivery;

document.getElementById(
"checkout-subtotal"
).textContent =
subtotal.toLocaleString();

document.getElementById(
"checkout-total"
).textContent =
total.toLocaleString();

}

async function placeOrder() {

    try {

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        if (cart.length === 0) {

            alert("Your cart is empty!");
            return;

        }

        let subtotal = 0;

cart.forEach(item=>{
    subtotal += item.price * item.quantity;
});

const delivery =
subtotal > 0 ? 3000 : 0;

const total =
subtotal + delivery;



        const orderData = {

            customerName:
                document.getElementById("fullName").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            address:
                document.getElementById("address").value +
                ", " +
                document.getElementById("city").value +
                ", " +
                document.getElementById("state").value,

            items: cart,

            total: total

        };

        const response =
            await fetch(
                "http://localhost:3000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(orderData)
                }
            );

       if (!response.ok) {
        throw new Error("Order could not be placed.");
    }

    const data = await response.json();

    alert("Order placed successfully!");

    console.log(data);

    // Clear cart
    localStorage.removeItem("cart");

    cart = [];

    updateCartCount();

    displayCart();

    displayCheckout();

    // Redirect
    window.location.href = "index.html";

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to place order"
            );

    }

}

function changeCartQty(index,value){

cart[index].quantity += value;

if(cart[index].quantity < 1){

cart[index].quantity = 1;

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();
displayCheckout();

updateCartCount();

}

function clearCart(){

if(

confirm(

"Clear your shopping cart?"

)

){

cart=[];

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

displayCart();
displayCheckoutTotal();
displayCheckout();

updateCartCount();

}

}