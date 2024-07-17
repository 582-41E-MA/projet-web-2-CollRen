// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Voiture = connex.define('voiture', {
        date: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT('long')
        },
        prix: {
            type: Sequelize.REAL
        },
        modele_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'modeles',
                key: 'id', allowNull: true
            }
        },
        commande_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'commandes',
                key: 'id', allowNull: true
            }
        },
        transmission_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'transmissions',
                key: 'id', allowNull: true
            }
        },
        motopropulseur_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'motopropulseurs',
                key: 'id', allowNull: true
            }
        },
        carburant_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'carburants',
                key: 'id', allowNull: true
            }
        },
        corp_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'corps',
                key: 'id', allowNull: true
            }
        },


    })

    return Voiture
}