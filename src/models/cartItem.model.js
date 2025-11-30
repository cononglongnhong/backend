const db = require("../config/db");

(async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id_cart_item INT AUTO_INCREMENT PRIMARY KEY,
      id_cart INT NOT NULL,
      id_product INT NOT NULL,
      id_variant INT,
      quantity INT NOT NULL,
      price_at_time DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (id_cart) REFERENCES carts(id_cart) ON DELETE CASCADE,
      FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE,
      FOREIGN KEY (id_variant) REFERENCES product_variants(id_variant) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await db.execute(sql);
})().catch(console.error);

const CartItems = {
  getByCart: async (cartId) => {
    const [rows] = await db.execute(
      "SELECT * FROM cart_items WHERE id_cart = ?",
      [cartId]
    );
    return rows;
  },

  addItem: async (data) => {
    const sql = `
      INSERT INTO cart_items (
        id_cart, id_product, id_variant, quantity, price_at_time
      )
      VALUES (?, ?, ?, ?, ?)
    `;
    const [res] = await db.execute(sql, [
      data.id_cart,
      data.id_product,
      data.id_variant || null,
      data.quantity,
      data.price_at_time,
    ]);
    return res;
  },

  updateQuantity: async (idCartItem, quantity) => {
    const [res] = await db.execute(
      "UPDATE cart_items SET quantity = ? WHERE id_cart_item = ?",
      [quantity, idCartItem]
    );
    return res;
  },

  removeItem: async (idCartItem) => {
    const [res] = await db.execute(
      "DELETE FROM cart_items WHERE id_cart_item = ?",
      [idCartItem]
    );
    return res;
  },

  clearCart: async (cartId) => {
    const [res] = await db.execute("DELETE FROM cart_items WHERE id_cart = ?", [
      cartId,
    ]);
    return res;
  },
};

module.exports = CartItems;
