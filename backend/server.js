// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const stripeRoutes = require('./app/routes/stripe/stripe.routes.js');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/stripe', stripeRoutes);

const db = require('./app/models');
db.connex.sync();

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue' });
});

// Autres routes
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

// Gestion des erreurs 404
app.use((req, res) => {
    res.statusMessage = "Ressource non trouvée";
    res.status(404).json("Ressource non trouvée");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}.`);
});
