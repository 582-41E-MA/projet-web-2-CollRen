const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const corsOption = {
    credentials: true,
    origin: '*'
}
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PGBD9KJGPCZHFEUhMOFEwpfz89jDpADgoY8VdEj4CPPser5niDzrQlriGhjbNy2Clh7hIvgCMbqoKi2eEpRpAFP00j5MxYhB0'); // Utilisez votre clé secrète Stripe ici


require('dotenv').config()

app.use(cors(corsOption))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./app/models')
db.connex.sync()
//test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome' })
})

app.post('/api/stripe/payment', async (req, res) => {
    const { amount, currency, source, description } = req.body;
  
    console.log('Received payment request:', req.body); // Ajoutez cette ligne pour voir les requêtes reçues
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: source,
        confirm: true,
        description,
      });
  
      console.log('Payment successful:', paymentIntent); // Ajoutez cette ligne pour voir les paiements réussis
      res.status(200).send({ success: true, paymentIntent });
    } catch (error) {
      console.error('Erreur lors du traitement du paiement:', error);
      res.status(500).send({ success: false, error: error.message });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

const stripeRoutes = require('./app/routes/stripe/stripe.routes');
app.use('/api/stripe', stripeRoutes);

require('./app/routes/utilisateur/utilisateur.routes')(app);
require('./app/routes/privilege/privilege.routes')(app);
require('./app/routes/ville/ville.routes')(app);
require('./app/routes/province/province.routes')(app);
require('./app/routes/statut/statut.routes')(app);
require('./app/routes/expedition/expedition.routes')(app);
require('./app/routes/corp/corp.routes')(app);
require('./app/routes/carburant/carburant.routes')(app);
require('./app/routes/motopropulseur/motopropulseur.routes')(app);
require('./app/routes/transmission/transmission.routes')(app);
require('./app/routes/constructeur/constructeur.routes')(app);
require('./app/routes/modele/modele.routes')(app);
require('./app/routes/image/image.routes')(app);
require('./app/routes/mode_paiement/mode_paiement.routes')(app);
require('./app/routes/voiture/voiture.routes')(app);
require('./app/routes/commande/commande.routes')(app);
require('./app/routes/taxe/taxe.routes')(app);
require('./app/routes/commande_has_taxe/commande_has_taxe.routes')(app);
require('./app/routes/journal/journal.routes')(app);

app.use((req, res) => {
    res.statusMessage = "Ressource non trouvée";
    res.status(404).json("Ressource non trouvée");
});


