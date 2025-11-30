// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { upload, uploadToCloudinary } = require("./middleware/upload");

const app = express();

// --- CORS SETUP ---
// Cho phép tất cả origin test, vẫn gửi cookie
app.use(cors({
  origin: true,        // cho phép tất cả domain
  credentials: true    // để cookie gửi qua
}));

// Preflight OPTIONS request global
app.options("*", cors({
  origin: true,
  credentials: true
}));

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cookieParser());

// --- ROUTERS ---
// Auth
app.use("/api/auth", require("./routes/auth.router"));
// Users
app.use("/api/users", require("./routes/user.router"));
// Categories
app.use("/api/categories", require("./routes/category.router"));
// Products
app.use("/api/products", require("./routes/product.router"));
// Product variants
app.use("/api/variants", require("./routes/productVariant.router"));
// Carts
app.use("/api/carts", require("./routes/cart.router"));
// Cart items
app.use("/api/cart-items", require("./routes/cartitem.router"));
// Orders
app.use("/api/orders", require("./routes/order.router"));
// Order items
app.use("/api/order-items", require("./routes/orderitem.router"));
// Payments
app.use("/api/payments", require("./routes/payment.router"));
// Reviews
app.use("/api/reviews", require("./routes/review.router"));
// Upload
app.use("/api/upload", require("./routes/upload.router"));

// --- SERVER RUN ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});
