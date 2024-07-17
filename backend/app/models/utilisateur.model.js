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
            type: Sequelize.DATEONLY
        },
        adresse: {
            type: Sequelize.STRING
        },
        ville_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'villes',
                key: 'id', allowNull: true
            }
        },
        code_postal: {
            type: Sequelize.STRING
        },
        telephone: {
            type: Sequelize.INTEGER
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
        token: {
            type: Sequelize.STRING
        },
        privilege_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'privileges',
                key: 'id', allowNull: true
            }
        }

    });


    return Utilisateur
}