// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Taxe = connex.define('taxe', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Taxe
}