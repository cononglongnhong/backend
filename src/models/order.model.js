const db = require("../config/db");

(async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id_order INT AUTO_INCREMENT PRIMARY KEY,
      id_user CHAR(36) NOT NULL,
      order_code VARCHAR(100) NOT NULL UNIQUE,
      total_amount DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      shipping_address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await db.execute(sql);
})().catch(console.error);

const Orders = {
  getAll: async () => {
    const [rows] = await db.execute(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    return rows;
  },

  getByUser: async (userId) => {
    const [rows] = await db.execute(
      "SELECT * FROM orders WHERE id_user = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM orders WHERE id_order = ?", [
      id,
    ]);
    return rows[0] || null;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO orders (
        id_user, order_code, total_amount, status, shipping_address
      )
      VALUES (?, ?, ?, ?, ?)
    `;
    const [res] = await db.execute(sql, [
      data.id_user,
      data.order_code,
      data.total_amount,
      data.status || "pending",
      data.shipping_address || null,
    ]);
    return res;
  },

  updateStatus: async (id, status) => {
    const [res] = await db.execute(
      "UPDATE orders SET status = ? WHERE id_order = ?",
      [status, id]
    );
    return res;
  },

  remove: async (id) => {
    const [res] = await db.execute("DELETE FROM orders WHERE id_order = ?", [
      id,
    ]);
    return res;
  },
};

module.exports = Orders;
