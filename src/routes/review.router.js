const router = require("express").Router();
const Reviews = require("../models/review.model");

// Lấy review theo sản phẩm
router.get("/product/:productId", async (req, res) => {
  try {
    const data = await Reviews.getByProduct(req.params.productId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Tạo / cập nhật review (1 user 1 review / product)
router.post("/", async (req, res) => {
  try {
    await Reviews.createOrUpdate(req.body);
    res.json({ message: "Gửi đánh giá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không gửi được đánh giá" });
  }
});

// Xóa review
router.delete("/:id", async (req, res) => {
  try {
    await Reviews.delete(req.params.id);
    res.json({ message: "Xóa đánh giá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không xóa được" });
  }
});

module.exports = router;
