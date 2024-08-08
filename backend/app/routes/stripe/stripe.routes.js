const express = require('express');
const router = express.Router();
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`); 
const db = require('../../models'); 
const Commande = db.commandes; 
const Voiture = db.voitures; // Assurez-vous d'avoir importé le modèle Voiture

// Route pour le paiement
router.post('/payment', async (req, res) => {
  const { payment_method_id, total, clientInfo, description, userId, voitureId, selectedModePaiement, selectedExpedition } = req.body;

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
      return_url: 'http://localhost:3000/confirmation' 
    });

    // Créer une nouvelle commande dans la base de données
    const newCommande = await Commande.create({
      date: new Date(),
      prix: total,
      mode_paiement_id: selectedModePaiement,
      expedition_id: selectedExpedition,
      utilisateur_id: userId,
      statut_id: 2 // Ajout du statut 2 pour la voiture vendue
    });

    // Mettre à jour le champ commande_id de la voiture
    const voiture = await Voiture.findByPk(voitureId);
    if (voiture) {
      voiture.commande_id = newCommande.id;
      await voiture.save();
      console.log('Voiture updated:', voiture);
    } else {
      console.log('Voiture not found with id:', voitureId);
    }

    res.json({ success: true, paymentIntent, newCommande });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour la réservation
router.post('/reservation', async (req, res) => {
  const { payment_method_id, total, clientInfo, description, userId, voitureId, selectedModePaiement, selectedExpedition } = req.body;

  try {
    // Créez un PaymentIntent pour la réservation
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
      return_url: 'http://localhost:3000/confirmation-reservation'
    });

    // Créer une nouvelle réservation dans la base de données
    const newReservation = await Commande.create({
      date: new Date(),
      prix: total,
      mode_paiement_id: selectedModePaiement,
      expedition_id: selectedExpedition,
      utilisateur_id: userId,
      statut_id: 1 // Ajout du statut 1 pour la réservation
    });

    // Mettre à jour le champ commande_id de la voiture
    const voiture = await Voiture.findByPk(voitureId);
    if (voiture) {
      voiture.commande_id = newReservation.id;
      await voiture.save();
    }

    res.json({ success: true, paymentIntent, newReservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
