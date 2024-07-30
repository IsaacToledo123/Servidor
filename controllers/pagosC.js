// controllers/pagoController.js
const Pago = require('../models/pagos');
const Cliente =require('../models/clientes')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPago = async (req, res) => {
    const { id, amount, clientId } = req.body;
  
    try {
      // Crear el intento de pago con Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method: id,
        confirm: true,
      });
  
      // Guardar el pago en la base de datos
      const newPago = new Pago({
        paymentMethodId: id,
        amount,
        clientId,
      });
  
      await newPago.save();
  
      const updatedCliente = await Cliente.findByIdAndUpdate(
        clientId,
        { plan: 'Basico' }, // Aquí debes definir el nuevo plan del cliente
        { new: true } 
      );
  
      res.json({ success: true, cliente: updatedCliente });
  
    } catch (err) {
      console.error('Error processing payment:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  };
  

module.exports = {
  createPago,
};
