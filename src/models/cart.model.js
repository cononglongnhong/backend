const db = require("../config/db");

(async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS carts (
      id_cart INT AUTO_INCREMENT PRIMARY KEY,
      id_user CHAR(36) NOT NULL UNIQUE,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await db.execute(sql);
})().catch(console.error);

const Carts = {
  getByUser: async (userId) => {
    const [rows] = await db.execute("SELECT * FROM carts WHERE id_user = ?", [
      userId,
    ]);
    return rows[0] || null;
  },

  createForUser: async (userId) => {
    const sql = "INSERT INTO carts (id_user) VALUES (?)";
    const [res] = await db.execute(sql, [userId]);
    return res;
  },

  delete: async (idCart) => {
    const [res] = await db.execute("DELETE FROM carts WHERE id_cart = ?", [
      idCart,
    ]);
    return res;
  },
};

module.exports = Carts;
