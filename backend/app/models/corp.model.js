// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Corp = connex.define('corp', {
        type: {
            type: Sequelize.TEXT('long')
        }

    })
    return Corp
}