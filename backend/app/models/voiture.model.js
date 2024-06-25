// import { DataTypes } from '@sequelize/core';
module.exports = (connex, Sequelize) => {
    const Voiture = connex.define('voiture', {
        date: {
            type: Sequelize.DATEONLY
        },
        description: {
            type: Sequelize.TEXT('long')
        },
        prix: {
            type: Sequelize.REAL
        },
        model_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'models',
                key: 'id'
            }
        },
        transmission_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'transmissions',
                key: 'id'
            }
        },
        motopropulseur_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'motopropulseurs',
                key: 'id'
            }
        },
        carburant_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'carburants',
                key: 'id'
            }
        },
        corp_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
                model: 'corps',
                key: 'id'
            }
        },


    })

    Voiture.associate = function (models) {
        Voiture.belongsTo(models.Model, { foreignKey: 'model_id', as: 'model' })
    };

    Voiture.associate = function (models) {
        Voiture.hasOne(models.Transmission, { foreignKey: 'transmission_id', as: 'transmission' })
    };


    Voiture.associate = function (models) {
        Voiture.hasOne(models.Motopropulseur, { foreignKey: 'motopropulseur_id', as: 'motopropulseur' })
    };

    Voiture.associate = function (models) {
        Voiture.hasOne(models.Carburant, { foreignKey: 'carburant_id', as: 'carburant' })
    };

    Voiture.associate = function (models) {
        Voiture.hasOne(models.Corp, { foreignKey: 'corp_id', as: 'corp' })
    };

    Voiture.associate = function (models) {
        Voiture.hasMany(models.Image, { as: 'images' })
    };


    return Voiture
}