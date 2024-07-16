const db = require("../models");
const Commande_has_taxe = db.commande_has_taxes;
const Op = db.Sequelize.Op;

// Create and Save a new Commande_has_taxe
exports.create = (req, res) => {

    // Save Commande_has_taxe in the database
    Commande_has_taxe.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Commande_has_taxe."
            });
        });
};

// Retrieve all Commande_has_taxes from the database.
exports.findAll = (req, res) => {


    Commande_has_taxe.findAll({ include: [{ model: db.taxes }, { model: db.commandes }] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving commande_has_taxes."
            });
        });
};

// Find a single Commande_has_taxe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Commande_has_taxe.findByPk(id, {
        include: [{ model: db.taxes }, { model: db.commandes }]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Commande_has_taxe with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Commande_has_taxe with id=" + id
            });
        });
};

// Update a Commande_has_taxe by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Commande_has_taxe.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Commande_has_taxe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Commande_has_taxe with id=${id}. Maybe Commande_has_taxe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Commande_has_taxe with id=" + id
            });
        });
};

// Delete a Commande_has_taxe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Commande_has_taxe.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Commande_has_taxe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Commande_has_taxe with id=${id}. Maybe Commande_has_taxe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Commande_has_taxe with id=" + id
            });
        });
};

// Delete all Commande_has_taxes from the database.
exports.deleteAll = (req, res) => {
    Commande_has_taxe.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Commande_has_taxes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all commande_has_taxes."
            });
        });
};