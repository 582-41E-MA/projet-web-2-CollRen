// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Transmission = connex.define('transmission', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Transmission
}