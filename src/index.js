require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// --- CORS: cho phép tất cả origin + gửi cookie ---
app.use(cors({
  origin: true,        // cho phép tất cả domain
  credentials: true    // gửi cookie cross-domain
}));

// Preflight OPTIONS cho tất cả route
app.options("*", cors({
  origin: true,
  credentials: true
}));

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- Routers ---
app.use("/api/auth", require("./routes/auth.router"));
app.use("/api/users", require("./routes/user.router"));
app.use("/api/categories", require("./routes/category.router"));
app.use("/api/products", require("./routes/product.router"));
app.use("/api/variants", require("./routes/productVariant.router"));
app.use("/api/carts", require("./routes/cart.router"));
app.use("/api/cart-items", require("./routes/cartitem.router"));
app.use("/api/orders", require("./routes/order.router"));
app.use("/api/order-items", require("./routes/orderitem.router"));
app.use("/api/payments", require("./routes/payment.router"));
app.use("/api/reviews", require("./routes/review.router"));
app.use("/api/upload", require("./routes/upload.router"));

// --- Server Run ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});
