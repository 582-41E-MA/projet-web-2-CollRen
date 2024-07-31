const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Utilisez la clé secrète depuis les variables d'environnement
const db = require('../../models'); // Assurez-vous que ce chemin est correct
const Commande = db.commandes; // Assurez-vous que 'commandes' correspond au nom défini dans votre modèle

// Route pour le paiement
router.post('/payment', async (req, res) => {
  const { payment_method_id, total, clientInfo, description, userId, selectedModePaiement, selectedExpedition } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe requires the amount in cents
      currency: 'cad',
      payment_method: payment_method_id,
      confirm: true,
      description: description,
      receipt_email: clientInfo.courriel, // Adresse e-mail du client
      metadata: {
        customer_name: `${clientInfo.prenom} ${clientInfo.nom}`, // Nom et prénom du client
        customer_address: clientInfo.adresse, // Adresse du client
      },
      return_url: 'http://localhost:3000/confirmation' // Remplacez par l'URL de retour appropriée
    });

    // Créer une nouvelle commande dans la base de données
    const newCommande = await Commande.create({
      date: new Date(),
      prix: total,
      mode_paiement_id: selectedModePaiement,
      expedition_id: selectedExpedition,
      utilisateur_id: userId,
      statut_id: 2 // Vous pouvez ajuster le statut selon vos besoins
    });

    res.json({ success: true, paymentIntent, newCommande });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
