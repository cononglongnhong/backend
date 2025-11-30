const router = require("express").Router();
const CartItems = require("../models/cartItem.model");

// Lấy item trong 1 cart
router.get("/:cartId", async (req, res) => {
  try {
    const data = await CartItems.getByCart(req.params.cartId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Thêm vào giỏ
router.post("/", async (req, res) => {
  try {
    await CartItems.addItem(req.body); // id_cart, id_product, id_variant, quantity, price_at_time
    res.json({ message: "Thêm vào giỏ hàng thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không thêm được vào giỏ" });
  }
});

// Cập nhật số lượng
router.put("/:id", async (req, res) => {
  try {
    await CartItems.updateQuantity(req.params.id, req.body.quantity);
    res.json({ message: "Cập nhật số lượng thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không cập nhật được" });
  }
});

// Xóa 1 item
router.delete("/:id", async (req, res) => {
  try {
    await CartItems.removeItem(req.params.id);
    res.json({ message: "Xóa sản phẩm khỏi giỏ" });
  } catch (err) {
    res.status(500).json({ message: "Không xóa được" });
  }
});

// Xóa hết giỏ
router.delete("/clear/:cartId", async (req, res) => {
  try {
    await CartItems.clearCart(req.params.cartId);
    res.json({ message: "Đã xóa toàn bộ giỏ hàng" });
  } catch (err) {
    res.status(500).json({ message: "Không xóa được" });
  }
});

module.exports = router;
