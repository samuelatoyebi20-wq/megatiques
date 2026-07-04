if (
localStorage.getItem("adminLoggedIn")
!== "true"
) {
window.location.href =
"admin-login.html";
}

const API =
"http://localhost:3000/api";

// LOAD PRODUCTS

async function loadProducts() {

    const response = await fetch(`${API}/products`);
    const products = await response.json();

    let html = "";

    products.forEach(product => {

        html += `

        <div class="admin-product">

            <img
                src="${product.image}"
                style="
                    width:120px;
                    height:120px;
                    object-fit:cover;
                    border-radius:8px;
                ">

            <div>

                <h3>${product.name}</h3>

                <p>₦${Number(product.price).toLocaleString()}</p>

                <p>Category: ${product.category}</p>

                <p>Stock: ${product.stock}</p>

                <div style="
                    margin-top:10px;
                    display:flex;
                    gap:6px;
                    flex-wrap:wrap;
                ">

                    ${product.featured ? '<span class="badge">⭐ Featured</span>' : ''}
                    ${product.newArrival ? '<span class="badge">🆕 New Arrival</span>' : ''}
                    ${product.trending ? '<span class="badge">🔥 Trending</span>' : ''}
                    ${product.bestSeller ? '<span class="badge">👑 Best Seller</span>' : ''}

                </div>

                <br>

                <button onclick="editProduct('${product._id}')">
                    Edit
                </button>

                <button onclick="deleteProduct('${product._id}')">
                    Delete
                </button>

            </div>

        </div>

        <hr>

        `;

    });

    document.getElementById("products-list").innerHTML = html;

}

async function loadCategories(){

const response =
await fetch(`${API}/categories`);

const categories =
await response.json();

let html = "";

categories.forEach(category=>{

html += `

<div class="admin-category">

<img src="${category.banner}">

<div>

<h3>${category.name}</h3>

<p>${category.slug}</p>

<p>${category.description}</p>

<button
onclick="editCategory('${category._id}')">

Edit

</button>

<button
onclick="deleteCategory('${category._id}')">

Delete

</button>

</div>

</div>

<hr>

`;

});

document.getElementById(
"categories-list"
).innerHTML = html;

}

async function loadCategoryDropdown() {

    const response = await fetch(`${API}/categories`);

    const categories = await response.json();

    const dropdown = document.getElementById("productCategory");

    if (!dropdown) return;

    dropdown.innerHTML = `
        <option value="">
            Select Collection
        </option>
    `;

    categories.forEach(category => {

        dropdown.innerHTML += `
            <option value="${category.slug}">
                ${category.name}
            </option>
        `;

    });

}

async function saveCategory(){

try{

let banner = "";

if(editingCategoryId){

const response =
await fetch(`${API}/categories/${editingCategoryId}`);

const oldCategory =
await response.json();

banner = oldCategory.banner;

}

const image =
document.getElementById("categoryBanner").files[0];

if(image){

const fd = new FormData();

fd.append("file",image);

fd.append("upload_preset","megatiques");

const upload =
await fetch(
"https://api.cloudinary.com/v1_1/dftzac4vx/image/upload",
{
method:"POST",
body:fd
});

const data =
await upload.json();

banner = data.secure_url;

}

const category = {

name:
document.getElementById("categoryName").value,

slug:
document.getElementById("categorySlug").value,

description:
document.getElementById("categoryDescription").value,

banner

};

const url = editingCategoryId
? `${API}/categories/${editingCategoryId}`
: `${API}/categories`;

const method =
editingCategoryId ? "PUT" : "POST";

const response = await fetch(url, {
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(category)
});

const result = await response.json();

console.log(result);

if (!response.ok) {
    throw new Error(result.error || result.message || "Failed to save category");
}

editingCategoryId = null;

document.getElementById("categoryName").value="";
document.getElementById("categorySlug").value="";
document.getElementById("categoryDescription").value="";
document.getElementById("categoryBanner").value="";

loadCategories();
loadCategoryDropdown();

alert("Collection saved successfully.");

}
catch(err){

console.error(err);

alert("Unable to save collection.");

}

}

async function editCategory(id) {

    const response =
        await fetch(`${API}/categories/${id}`);

    const category =
        await response.json();

    editingCategoryId = id;

    document.getElementById("categoryName").value =
        category.name;

    document.getElementById("categorySlug").value =
        category.slug;

    document.getElementById("categoryDescription").value =
        category.description;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

async function deleteCategory(id) {

    if (!confirm("Delete this collection?")) return;

    await fetch(`${API}/categories/${id}`, {

        method: "DELETE"

    });

    loadCategories();

    loadCategoryDropdown();

}

let editingProductId = null;
let editingCategoryId = null;

async function editProduct(id){

    const response = await fetch(`${API}/products/${id}`);

    const product = await response.json();

    editingProductId = id;

    document.getElementById("productName").value = product.name;

    document.getElementById("productPrice").value = product.price;

    document.getElementById("productDescription").value = product.description;

    document.getElementById("productCategory").value = product.category;

    document.getElementById("productStock").value = product.stock;

    document.getElementById("featured").checked = product.featured || false;

    document.getElementById("newArrival").checked = product.newArrival ?? true;

    document.getElementById("trending").checked = product.trending || false;

    document.getElementById("bestSeller").checked = product.bestSeller || false;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}
// LOAD ORDERS

async function loadOrders() {


const response =
await fetch(`${API}/orders`);

const orders =
await response.json();

let html = "";

orders.forEach(order => {

    html += `

    <div class="admin-order">

        <h3>
            ${order.customerName}
        </h3>

        <p>
            ${order.email}
        </p>

        <p>
            ${order.phone || ""}
        </p>

        <p>
            <strong>Total:</strong>
            ₦${Number(
                order.total || 0
            ).toLocaleString()}
        </p>

        <p>
            <strong>Address:</strong>
            ${order.address || ""}
        </p>

        <p>
            <strong>Items:</strong>
            ${order.items ?
            order.items.length : 0}
            item(s)
        </p>

        <p>
            <strong>Status:</strong>
        </p>

        <button
        onclick="viewOrder('${order._id}')">

        View Details

        </button>

        <select
        onchange="updateOrderStatus(
        '${order._id}',
        this.value
        )">

            <option
            value="Pending"
            ${order.status === "Pending" ? "selected" : ""}>
            Pending
            </option>

            <option
            value="Processing"
            ${order.status === "Processing" ? "selected" : ""}>
            Processing
            </option>

            <option
            value="Shipped"
            ${order.status === "Shipped" ? "selected" : ""}>
            Shipped
            </option>

            <option
            value="Delivered"
            ${order.status === "Delivered" ? "selected" : ""}>
            Delivered
            </option>

            <option
            value="Cancelled"
            ${order.status === "Cancelled" ? "selected" : ""}>
            Cancelled
            </option>

        </select>

    </div>

    <hr>

    `;

});

document.getElementById(
    "orders-list"
).innerHTML = html;


}

// ADD PRODUCT

async function addProduct() {

try{

    const imageFile = document.getElementById("productImage").files[0];
    const galleryFiles = document.getElementById("productGallery").files;

    if (!imageFile && !editingProductId) {
        alert("Please select a product image.");
        return;
    }

    let imageUrl = "";

// Keep old image while editing
if (editingProductId) {

    const oldResponse =
    await fetch(`${API}/products/${editingProductId}`);

    const oldProduct =
    await oldResponse.json();

    imageUrl = oldProduct.image;

}

// Upload new image if one was selected
if (imageFile) {

    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("upload_preset", "megatiques");

    const upload = await fetch(
        "https://api.cloudinary.com/v1_1/dftzac4vx/image/upload",
        {
            method:"POST",
            body:formData
        }
    );

    const cloudinaryData =
    await upload.json();

    imageUrl =
    cloudinaryData.secure_url;

}

    // Upload gallery images
    let gallery = [];

if(editingProductId){

    const oldResponse =
    await fetch(`${API}/products/${editingProductId}`);

    const oldProduct =
    await oldResponse.json();

    gallery =
    oldProduct.gallery || [];

}

for(const file of galleryFiles){

        const fd = new FormData();

        fd.append("file", file);
        fd.append("upload_preset", "megatiques");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dftzac4vx/image/upload",
            {
                method: "POST",
                body: fd
            }
        );

        const data = await res.json();

        gallery.push(data.secure_url);

    }

    const product = {

        name: document.getElementById("productName").value,

        price: Number(
            document.getElementById("productPrice").value
        ),

        image: imageUrl,

        gallery: gallery,

        description:
            document.getElementById("productDescription").value,

        category:
            document.getElementById("productCategory").value,

        stock:
            Number(
                document.getElementById("productStock").value
            ),

        featured:
            document.getElementById("featured").checked,

        newArrival:
            document.getElementById("newArrival").checked,

        trending:
            document.getElementById("trending").checked,

        bestSeller:
            document.getElementById("bestSeller").checked

    };

    const url = editingProductId
        ? `${API}/products/${editingProductId}`
        : `${API}/products`;

    const method = editingProductId
        ? "PUT"
        : "POST";

    const saveResponse = await fetch(url,{
        

        method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    });

    if(!saveResponse.ok){
    throw new Error("Unable to save product");
}

    alert(
        editingProductId
            ? "Product Updated Successfully"
            : "Product Added Successfully"
    );

    // Reset Form
    document.getElementById("productName").value = "";
document.getElementById("productPrice").value = "";
document.getElementById("productImage").value = "";
document.getElementById("productGallery").value = "";
document.getElementById("productCategory").value = "";
document.getElementById("productStock").value = "";
document.getElementById("productDescription").value = "";

document.getElementById("featured").checked = false;
document.getElementById("newArrival").checked = true;
document.getElementById("trending").checked = false;
document.getElementById("bestSeller").checked = false;

editingProductId = null;

loadProducts();
loadStats();

}
catch(error){

    console.error(error);

    alert("Something went wrong.");

}

}
// DELETE PRODUCT

async function deleteProduct(id) {


if (
    !confirm(
    "Delete this product?"
    )
) return;

const response = await fetch(
`${API}/products/${id}`,
{
    method:"DELETE"
}
);

if(!response.ok){
    alert("Unable to delete product");
    return;
}

loadProducts();
loadStats();
}

// UPDATE ORDER STATUS

async function updateOrderStatus(
id,
status
) {


await fetch(
    `${API}/orders/${id}`,
    {

        method: "PUT",

        headers: {
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify({
            status
        })

    }
);

loadOrders();
loadStats();


}

// PRODUCT SEARCH

function searchProducts() {

const input =
document.getElementById(
"searchProduct"
).value.toLowerCase();

const products =
document.querySelectorAll(
".admin-product"
);

products.forEach(product => {

    if (
        product.innerText
        .toLowerCase()
        .includes(input)
    ) {

        product.style.display =
        "flex";

    } else {

        product.style.display =
        "none";

    }

});


}

// DASHBOARD STATS

async function loadStats() {


const productsRes =
await fetch(`${API}/products`);

const ordersRes =
await fetch(`${API}/orders`);

const customersRes =
await fetch(`${API}/customers`);

const products =
await productsRes.json();

const orders =
await ordersRes.json();

const customers =
await customersRes.json();

let revenue = 0;

let pendingOrders = 0;

orders.forEach(order => {

    revenue +=
    Number(
    order.total || 0
    );

    if (
        order.status ===
        "Pending"
    ) {
        pendingOrders++;
    }

});

const totalProducts =
document.getElementById(
"total-products"
);

const totalOrders =
document.getElementById(
"total-orders"
);

const totalRevenue =
document.getElementById(
"total-revenue"
);

const pending =
document.getElementById(
"pending-orders"
);

const totalCustomers =
document.getElementById(
"total-customers"
);

if (totalProducts)
    totalProducts.textContent =
    products.length;

if (totalOrders)
    totalOrders.textContent =
    orders.length;

if (totalRevenue)
    totalRevenue.textContent =
    "₦" +
    revenue.toLocaleString();

if (pending)
    pending.textContent =
    pendingOrders;

if (totalCustomers)
    totalCustomers.textContent =
    customers.length;


}

// LOGOUT

function logoutAdmin() {

localStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"admin-login.html";


}

async function viewOrder(id){

const response =
await fetch(
`${API}/orders`
);

const orders =
await response.json();

const order =
orders.find(o=>o._id===id);

if (!order) {
    alert("Order not found");
    return;
}

let itemsHTML = "";

order.items.forEach(item=>{

itemsHTML += `



<div class="order-item">

<div>

<strong>
${item.name || item.product}
</strong>

<br>

Quantity:
${item.quantity}

</div>

<div>

₦${Number(
item.price || 0
).toLocaleString()}

</div>

</div>

`;

});

document.getElementById(
"orderDetails"
).innerHTML = `

<div class="order-info">

<h3>
Customer
</h3>

<p>
<strong>Name:</strong>
${order.customerName}
</p>

<p>
<strong>Email:</strong>
${order.email}
</p>

<p>
<strong>Phone:</strong>
${order.phone}
</p>

<p>
<strong>Address:</strong>
${order.address}
</p>

<p>
<strong>Status:</strong>
${order.status}
</p>

</div>

<h3>
Products
</h3>

${itemsHTML}

<div class="order-total">

Total:
₦${Number(order.total).toLocaleString()}

</div>

`;

document.getElementById(
"orderModal"
).style.display =
"block";

}

function closeOrderModal(){

document.getElementById(
"orderModal"
).style.display =
"none";

}

window.onclick=function(event){

const modal=
document.getElementById(
"orderModal"
);

if(event.target===modal){

modal.style.display=
"none";

}

}

// INITIAL LOAD

loadProducts();
loadCategories();
loadCategoryDropdown();
loadOrders();
loadStats();
