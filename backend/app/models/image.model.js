// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Image = connex.define('image', {
        est_principale: {
            type: Sequelize.TINYINT
        },
        chemin: {
            type: Sequelize.TEXT
        },
        voiture_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         
                model: 'voitures',
                key: 'id'
            }
        }

    })


    return Image
}