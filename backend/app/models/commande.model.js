// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Commande = connex.define('commande', {
        date: {
            type: Sequelize.DATEONLY
        },
        prix: {
            type: Sequelize.REAL
        },
        mode_paiement_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         // WorkingDays hasMany Users n:n
                model: 'mode_paiements',
                key: 'id'
            }
        },
        expdedition_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         // WorkingDays hasMany Users n:n
                model: 'expeditions',
                key: 'id'
            }
        },
        utilisateur_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         // WorkingDays hasMany Users n:n
                model: 'utilisateurs',
                key: 'id'
            }
        },
        statut_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'statuts',
                key: 'id'
            }
        },

    })
    return Commande
}