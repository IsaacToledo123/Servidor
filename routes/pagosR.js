// routes/pagoRoutes.js
const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagosC');

// Ruta para crear un pago
router.post('/pago', pagoController.createPago);

module.exports = router;
