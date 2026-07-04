const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB =
require("./database/connection");
const productRoutes =
require("./routes/products");
const orderRoutes =
require("./routes/orders");
const customerRoutes =
require("./routes/customers");
const categoryRoutes =
require("./routes/categories");
console.log("Category routes loaded!");

const app = express();

connectDB();

console.log(productRoutes);
console.log(orderRoutes);
console.log(customerRoutes);
console.log(categoryRoutes);

app.use(cors());

app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "..")
    )
);


// HOME ROUTE

app.get("/", (req, res) => {

    res.send(
        "MEGATIQUES Backend Running"
    );

});





// PRODUCT ROUTES

app.use(
    "/api/products",
    productRoutes
);


// ORDER ROUTES

app.use(
    "/api/orders",
    orderRoutes
);


// CUSTOMER ROUTES

app.use(
    "/api/customers",
    customerRoutes
);

// CATEGORY ROUTES

app.use(
    "/api/categories",
    categoryRoutes
);


const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});