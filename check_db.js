const db = require("./src/config/db");

(async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM categories WHERE id_category = 1");
    console.log("Category 1:", rows[0] || "Not found");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
