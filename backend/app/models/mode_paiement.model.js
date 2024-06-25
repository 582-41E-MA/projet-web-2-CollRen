// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Mode_paiement = connex.define('mode_paiement', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Mode_paiement
}