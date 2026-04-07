// src/controllers/technician-controller.js

const { getConnection, sql } = require("../db");

/* ==============================
   GET ALL TECHNICIANS (TABLE)
============================== */
async function getTechnicians(req, res, next) {
  try {
    const pool = await getConnection();

    const result = await pool.request()
      .input("role", sql.NVarChar, "technician")
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

    console.log(result)
    res.json(result.recordset);

  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTechnicians,
};