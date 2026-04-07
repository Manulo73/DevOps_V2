// src/routes/technicians.js

const express = require("express");
const router = express.Router();

const technicianController = require("../controllers/technician-controller");

// Routes
router.get("/get-table", technicianController.getTechnicians);

module.exports = router;