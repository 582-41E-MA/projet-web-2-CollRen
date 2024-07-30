// stripe.routes.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/payment', async (req, res) => {
  try {
    const { payment_method_id, total } = req.body;

    // Créez le PaymentIntent avec automatic_payment_methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Le montant doit être en centimes
      currency: 'usd', // Changez la devise si nécessaire
      payment_method: payment_method_id,
      confirm: true,
      automatic_payment_methods: { enabled: true }, // Ajoutez cette ligne pour activer les méthodes de paiement automatiques
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
