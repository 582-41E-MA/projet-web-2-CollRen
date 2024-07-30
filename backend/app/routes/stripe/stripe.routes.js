const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Utilisez la clé secrète depuis les variables d'environnement

// Route pour le paiement
router.post('/payment', async (req, res) => {
  const { payment_method_id, total } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe requires the amount in cents
      currency: 'cad',
      payment_method: payment_method_id,
      confirm: true,
      return_url: 'http://localhost:3000/confirmation' // Remplacez par l'URL de retour appropriée
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
