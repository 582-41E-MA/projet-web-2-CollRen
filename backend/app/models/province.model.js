// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Province = connex.define('province', {
        nom: {
            type: Sequelize.TEXT('long')
        }

    });

    Province.associate = function (models) {
        Province.hasMany(models.Ville, { as: 'villes' })
    };
    return Province
}