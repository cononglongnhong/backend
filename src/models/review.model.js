const db = require("../config/db");

(async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS reviews (
      id_review INT AUTO_INCREMENT PRIMARY KEY,
      id_product INT NOT NULL,
      id_user CHAR(36) NOT NULL,
      rating INT NOT NULL,
      title VARCHAR(255),
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_review_product_user (id_product, id_user),
      FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE,
      FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await db.execute(sql);
})().catch(console.error);

const Reviews = {
  getByProduct: async (productId) => {
    const [rows] = await db.execute(
      "SELECT * FROM reviews WHERE id_product = ? ORDER BY created_at DESC",
      [productId]
    );
    return rows;
  },

  createOrUpdate: async (data) => {
    // upsert theo (id_product, id_user)
    const sql = `
      INSERT INTO reviews (id_product, id_user, rating, title, content)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        rating = VALUES(rating),
        title = VALUES(title),
        content = VALUES(content)
    `;
    const [res] = await db.execute(sql, [
      data.id_product,
      data.id_user,
      data.rating,
      data.title || null,
      data.content || null,
    ]);
    return res;
  },

  delete: async (idReview) => {
    const [res] = await db.execute("DELETE FROM reviews WHERE id_review = ?", [
      idReview,
    ]);
    return res;
  },
};

module.exports = Reviews;
