// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Commande_has_taxe = connex.define('commande_has_taxe', {
        taux: {
            type: Sequelize.REAL
        },
        taxe_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'taxes',
                key: 'id', allowNull: false
            }
        },
        commande_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'commandes',
                key: 'id', allowNull: false
            }
        },

    })
    return Commande_has_taxe
}