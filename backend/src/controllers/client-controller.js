// src/controllers/client-controller.js

const { getConnection, sql } = require("../db");

/* ==============================
   GET ALL CLIENTS (TABLE)
============================== */
async function getClients(req, res, next) {
  try {
    const pool = await getConnection();

    const result = await pool.request()
      .input("role", sql.NVarChar, "client")
      .query(`
        SELECT
          public_id,
          full_name,
          email,
          role,
          is_active,
          created_at
        FROM users
        WHERE role = @role
        ORDER BY created_at DESC
      `);

    res.json(result.recordset);

  } catch (err) {
    next(err);
  }
}

module.exports = {
  getClients,
};