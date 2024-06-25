// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Constructeur = connex.define('constructeur', {
        type: {
            type: Sequelize.TEXT
        }

    })
    Constructeur.associate = function (models) {
        Constructeur.hasMany(models.Model, { as: 'models' })
    };
    return Constructeur
}