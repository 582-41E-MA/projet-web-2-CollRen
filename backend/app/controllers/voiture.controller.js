const { Model } = require("sequelize");
const db = require("../models");
const Voiture = db.voitures;
const Op = db.Sequelize.Op;

const Carburant = db.carburants
const Constructeur = db.constructeurs
const Corp = db.corps
const Image = db.images
const Modele = db.modeles
const Motopropulseur = db.motopropulseurs
const Transmission = db.transmissions

// Create and Save a new Voiture
exports.create = (req, res) => {

    // Save Voiture in the database
    Voiture.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Voiture."
            });
        });
};

exports.findAll = (req, res) => {
    // var condition = constructeur ? { constructeur: { [Op.like]: `%${constructeur}%` } } : null;
    // var condition = modele ? { modele_id: { [Op.like]: `%${model}%` } } : null;

    // api/voitures/?modele_id=27&transmission_id=1&motopropulseur_id=1&carburant_id=1&corp_id=2

    //Début de la section des filtres par fonctions
    const queryCarburant = req.query.carburant_id;
    const queryConstructeur = req.query.constructeur_id;
    const queryCorp = req.query.corp_id;
    const queryModele = req.query.modele_id;
    const queryMotopropulseur = req.query.motopropulseur_id;
    const queryTransmission = req.query.transmission_id;


    var condition = {}
    condition.carburant = {}
    condition.constructeur = {}
    condition.corp = {}
    condition.modele = {}
    condition.motopropulseur = {}
    condition.transmission = {}
    condition.date = {}

    queryCarburant ? condition.carburant.id = queryCarburant : null;
    queryConstructeur ? condition.constructeur.id = queryConstructeur : null;
    queryCorp ? condition.corp.id = queryCorp : null;
    queryModele ? condition.modele.id = queryModele : null;
    queryMotopropulseur ? condition.motopropulseur.id = queryMotopropulseur : null;
    queryTransmission ? condition.transmission.id = queryTransmission : null;

    //Fin de la section des filtres par fonctions

    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    // Filtres par date (année de fabrication)
    const queryDateMin = req.query.datemin;
    const queryDateMax = req.query.datemax;
    const queryDateIs = req.query.dateis;

    queryDateMin ? condition.date.datemin = queryDateMin : condition.date.datemin = 0;
    queryDateMax ? condition.date.datemax = queryDateMax : condition.date.datemax = 2999;
    queryDateIs ? condition.date.datemax = condition.date.datemin = req.query.dateis : undefined;

    var dateCondition = { date: { [Op.between]: [condition.date.datemin, condition.date.datemax] } }

    Voiture.findAll({
        where: dateCondition,
        include:
            [
                { model: Carburant, where: condition.carburant },
                /* { model: Constructeur, where: condition.constructeur }, */ // {"message":"constructeur is not associated to voiture!"}
                { model: Corp, where: condition.corp },
                { model: Modele, where: condition.modele, include: [Constructeur] },
                { model: Motopropulseur, where: condition.motopropulseur },
                { model: Transmission, where: condition.transmission },
                { model: Image }
            ]

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("Erro ao buscar voitures:", err);
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao recuperar os dados de voitures."
            });
        });
};

// Find a single Voiture with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Voiture.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Voiture with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Voiture with id=" + id
            });
        });
};

// Update a Voiture by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Voiture.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Voiture was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Voiture with id=${id}. Maybe Voiture was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Voiture with id=" + id
            });
        });
};

// Delete a Voiture with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Voiture.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Voiture was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Voiture with id=${id}. Maybe Voiture was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Voiture with id=" + id
            });
        });
};

// Delete all Voitures from the database.
exports.deleteAll = (req, res) => {
    Voiture.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Voitures were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all voitures."
            });
        });
};