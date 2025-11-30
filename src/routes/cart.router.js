const router = require("express").Router();
const Carts = require("../models/cart.model");

// Lấy giỏ hàng theo user (tạo nếu chưa có)
router.get("/:userId", async (req, res) => {
  try {
    let cart = await Carts.getByUser(req.params.userId);
    if (!cart) {
      await Carts.createForUser(req.params.userId);
      cart = await Carts.getByUser(req.params.userId);
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Xóa luôn giỏ hàng
router.delete("/:cartId", async (req, res) => {
  try {
    await Carts.delete(req.params.cartId);
    res.json({ message: "Xóa giỏ hàng thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không xóa được" });
  }
});

module.exports = router;
