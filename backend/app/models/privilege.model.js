// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Privilege = connex.define('privilege', {
        type: {
            type: Sequelize.TEXT('long')
        }

    });
    Privilege.associate = function (models) {
        Privilege.hasMany(models.Utilisateur, { as: 'utilisateurs' })
    };
    return Privilege
}