const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment', async (req, res) => {
  try {
    const { amount, source, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method: source,
      confirm: true,
      description
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
