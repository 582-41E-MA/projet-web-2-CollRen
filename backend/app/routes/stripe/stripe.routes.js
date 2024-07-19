const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

router.post('/payment', async (req, res) => {
    const { amount, currency, source, description } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            description,
        });
        res.json({ success: true, charge });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
