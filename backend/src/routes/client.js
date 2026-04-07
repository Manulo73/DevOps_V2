// src/routes/clients.js

const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client-controller");

// Routes
router.get("/get-table", clientController.getClients);

module.exports = router;