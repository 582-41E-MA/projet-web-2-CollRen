// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Statut = connex.define('statut', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Statut
}