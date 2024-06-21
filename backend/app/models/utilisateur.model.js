// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Utilisateur = connex.define('utilisateur', {
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        anniversaire: {
            type: Sequelize.DATE
        },
        adresse: {
            type: Sequelize.STRING
        },
        code_postal: {
            type: Sequelize.STRING
        },
        telephone: {
            type: Sequelize.TEXT('long')
        },
        telephone: {
            type: Sequelize.INTEGER
        },
        cellulaire: {
            type: Sequelize.INTEGER
        },
        courriel: {
            type: Sequelize.STRING
        },
        nom_utilisateur: {
            type: Sequelize.STRING
        },
        mot_de_passe: {
            type: Sequelize.STRING
        },
        privilege_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'privileges',
                key: 'id'
            }
        }

    });
    Utilisateur.associate = function (models) {
        Utilisateur.belongsTo(models.Privilege, { foreignKey: 'privilege_id', as: 'privilege' })
    };
    
    return Utilisateur
}