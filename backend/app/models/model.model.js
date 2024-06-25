// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Model = connex.define('model', {
        type: {
            type: Sequelize.TEXT
        },
        constructeur_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'constructeurs',
                key: 'id'
            }
        }

    })


    return Model
}