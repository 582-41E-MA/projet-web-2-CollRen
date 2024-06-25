// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Ville = connex.define('ville', {
        nom: {
            type: Sequelize.TEXT('long')
        },
        province_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // provinces hasMany ville n:n
                model: 'provinces',
                key: 'id'
            }
        }

    });
    Ville.associate = function (models) {
        Ville.belongsTo(models.Province, { foreignKey: 'province_Id', as: 'province' })
    };
    return Ville
}