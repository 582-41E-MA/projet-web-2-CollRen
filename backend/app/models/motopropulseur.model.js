// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Motopropulseur = connex.define('motopropulseur', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Motopropulseur
}