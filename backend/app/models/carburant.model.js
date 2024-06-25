// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Carburant = connex.define('carburant', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Carburant
}