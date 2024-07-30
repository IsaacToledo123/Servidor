// models/pago.js
const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  paymentMethodId: { type: String, required: true },
  amount: { type: Number, required: true },
  clientId: { type: String, required: true }, // Nuevo campo para el ID del cliente
  timestamp: { type: Date, default: Date.now }
});

const Pago = mongoose.model('Pago', pagoSchema);

module.exports = Pago;
