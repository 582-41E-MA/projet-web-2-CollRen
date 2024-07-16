// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Journal = connex.define('journal', {
        date: {
            type: Sequelize.DATEONLY
        },
        adresse_ip: {
            type: Sequelize.INTEGER
        },
        utilisateur_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateurs',
                key: 'id', allowNull: false
            }
        },

    })
    return Journal
}