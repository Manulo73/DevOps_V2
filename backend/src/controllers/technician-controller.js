// src/controllers/technician-controller.js

const { getConnection, sql } = require("../db");

/* ==============================
   GET ALL TECHNICIANS
============================== */
async function getTechnicians(req, res, next) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("role", sql.NVarChar, "technician")
      .query(`
        SELECT public_id, full_name, email, role, is_active, created_at 
        FROM users 
        WHERE role = @role 
        ORDER BY created_at DESC
      `);
    res.json(result.recordset);
  } catch (err) {
    next(err);
  }
}

/* ==============================
   GET SINGLE TECHNICIAN
============================== */
async function getTechnicianByPublicId(req, res, next) {
  try {
    const { public_id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("public_id", sql.UniqueIdentifier, public_id)
      .query(`
        SELECT public_id, full_name, email, is_active 
        FROM users 
        WHERE public_id = @public_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    next(err);
  }
}

/* ==============================
   CREATE TECHNICIAN
============================== */
async function createTechnician(req, res, next) {
  try {
    const { full_name, email, is_active } = req.body;
    const pool = await getConnection();

    // Note: password_hash is placeholder. 
    // In production, use bcrypt.hash(password, 10)
    await pool.request()
      .input("full_name", sql.NVarChar, full_name)
      .input("email", sql.NVarChar, email)
      .input("role", sql.NVarChar, "technician")
      .input("is_active", sql.Bit, is_active ?? 1)
      .input("password_hash", sql.NVarChar, "temporary_hashed_password") 
      .query(`
        INSERT INTO users (full_name, email, role, is_active, password_hash)
        VALUES (@full_name, @email, @role, @is_active, @password_hash)
      `);

    res.status(201).json({ message: "Technician created successfully" });
  } catch (err) {
    if (err.number === 2627) { // SQL Server error for Unique Constraint violation
      return res.status(400).json({ message: "The email is already in use." });
    }
    next(err);
  }
}

/* ==============================
   EDIT TECHNICIAN
============================== */
async function editTechnician(req, res, next) {
  try {
    const { public_id } = req.params;
    const { full_name, email, is_active } = req.body;
    const pool = await getConnection();

    const result = await pool.request()
      .input("public_id", sql.UniqueIdentifier, public_id)
      .input("full_name", sql.NVarChar, full_name)
      .input("email", sql.NVarChar, email)
      .input("is_active", sql.Bit, is_active)
      .query(`
        UPDATE users 
        SET full_name = @full_name, 
            email = @email, 
            is_active = @is_active
        WHERE public_id = @public_id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.json({ message: "Technician updated successfully" });
  } catch (err) {
    next(err);
  }
}

/* ==============================
    DELETE TECHNICIAN
============================== */
async function deleteTechnician(req, res, next) {
  try {
    const { public_id } = req.params;
    const pool = await getConnection();

    const result = await pool.request()
      .input("public_id", sql.UniqueIdentifier, public_id)
      .query(`
        DELETE FROM users 
        WHERE public_id = @public_id
      `);

    // result.rowsAffected is an array, e.g., [1]
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.json({ message: "Technician deleted successfully" });
  } catch (err) {
    // Check for Foreign Key constraint violation (SQL Server error 547)
    if (err.number === 547) {
      return res.status(400).json({ 
        message: "No se puede eliminar el técnico porque tiene registros asociados (ej. incidentes)." 
      });
    }
    next(err);
  }
}

// Don't forget to update the module.exports at the bottom!
module.exports = {
  getTechnicians,
  getTechnicianByPublicId,
  createTechnician,
  editTechnician,
  deleteTechnician, // Added this
};