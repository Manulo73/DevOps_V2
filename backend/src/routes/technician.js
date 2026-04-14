// src/routes/technicians.js

const express = require("express");
const router = express.Router();
const technicianController = require("../controllers/technician-controller");

// GET all for the table
router.get("/get-table", technicianController.getTechnicians);

// GET a single technician by public_id
router.get("/:public_id", technicianController.getTechnicianByPublicId);

// POST create a new technician
router.post("/create", technicianController.createTechnician);

// PUT update an existing technician
router.put("/update/:public_id", technicianController.editTechnician);

// DELETE a technician
router.delete("/delete/:public_id", technicianController.deleteTechnician);

module.exports = router;