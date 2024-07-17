// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Taxe = connex.define('taxe', {
        type: {
            type: Sequelize.TEXT('long')
        },
        taux: {
            type: Sequelize.REAL
        }, 
        province_id: {
            type: Sequelize.INTEGER,
            references: {         // provinces hasMany ville n:n
                model: 'provinces',
                key: 'id',
                allowNull: true
            }
        }

    })
    return Taxe
}