// import { DataTypes } from '@sequelize/core';

const constructeurModel = require("./constructeur.model")
const Voiture = require("./voiture.model")

module.exports = (connex, Sequelize) => {
    var Modele = connex.define('modele', {
        type: {
            type: Sequelize.TEXT
        },
        constructeur_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'constructeurs',
                key: 'id', allowNull: true
            }
        }

    })

    return Modele
}