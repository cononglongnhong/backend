const router = require("express").Router();
const Variants = require("../models/productVariant.model");

// Lấy tất cả variant của 1 product
router.get("/product/:productId", async (req, res) => {
  try {
    const data = await Variants.getByProduct(req.params.productId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Variants.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Lấy 1 variant
router.get("/:id", async (req, res) => {
  try {
    const v = await Variants.getById(req.params.id);
    if (!v) return res.status(404).json({ message: "Không tìm thấy biến thể" });
    res.json(v);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Tạo variant
router.post("/", async (req, res) => {
  try {
    await Variants.create(req.body); // id_product, size, color, price_variant...
    res.json({ message: "Tạo biến thể thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Không tạo được biến thể" });
  }
});

// Cập nhật variant
router.put("/:id", async (req, res) => {
  try {
    await Variants.update(req.params.id, req.body);
    res.json({ message: "Cập nhật biến thể thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Không cập nhật được" });
  }
});

// Xóa variant
router.delete("/:id", async (req, res) => {
  try {
    await Variants.delete(req.params.id);
    res.json({ message: "Xóa biến thể thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không xóa được" });
  }
});

module.exports = router;
