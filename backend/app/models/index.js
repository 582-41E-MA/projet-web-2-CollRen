const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    operatorAliases: false
})

const db = {}
db.Sequelize = Sequelize
db.connex = connex
db.privileges = require('./privilege.model.js')(connex, Sequelize)
db.utilisateurs = require('./utilisateur.model.js')(connex, Sequelize)
db.villes = require('./ville.model.js')(connex, Sequelize)
db.provinces = require('./province.model.js')(connex, Sequelize)
db.statuts = require('./statut.model.js')(connex, Sequelize)
db.expeditions = require('./expedition.model.js')(connex, Sequelize)
db.corps = require('./corp.model.js')(connex, Sequelize)
db.carburants = require('./carburant.model.js')(connex, Sequelize)
db.motopropulseurs = require('./motopropulseur.model.js')(connex, Sequelize)
db.transmissions = require('./transmission.model.js')(connex, Sequelize)
db.constructeurs = require('./constructeur.model.js')(connex, Sequelize)
db.models = require('./model.model.js')(connex, Sequelize)
db.images = require('./image.model.js')(connex, Sequelize)
db.voitures = require('./mode_paiement.model.js')(connex, Sequelize)
db.voitures = require('./voiture.model.js')(connex, Sequelize)
db.voitures = require('./commande.model.js')(connex, Sequelize)
// db.sig = require('./connexion.model.js')(connex, Sequelize)


module.exports = db