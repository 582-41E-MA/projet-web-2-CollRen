const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const corsOption = {
    credentials: true,
    origin: '*'
}
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

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
require('./app/routes/model/model.routes')(app);
require('./app/routes/image/image.routes')(app);
require('./app/routes/mode_paiement/mode_paiement.routes')(app);
require('./app/routes/voiture/voiture.routes')(app);
require('./app/routes/commande/commande.routes')(app);

app.use((req, res) => {
    res.statusMessage = "Ressource non trouvée";
    res.status(404).json("Ressource non trouvée");
});


