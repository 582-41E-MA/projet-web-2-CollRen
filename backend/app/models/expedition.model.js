// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Expedition = connex.define('expedition', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Expedition
}