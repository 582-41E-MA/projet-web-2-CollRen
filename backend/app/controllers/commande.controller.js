const db = require("../models");
const Commande = db.commandes;
const Op = db.Sequelize.Op;

// Create and Save a new Commande
exports.create = (req, res) => {
    // Validate request
    /*     if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        } */

    // Save Commande in the database
    Commande.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Commande."
            });
        });
};

// Retrieve all Commandes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Commande.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving commandes."
            });
        });
};

// Find a single Commande with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Commande.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Commande with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Commande with id=" + id
            });
        });
};

// Update a Commande by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Commande.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Commande was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Commande with id=${id}. Maybe Commande was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Commande with id=" + id
            });
        });
};

// Delete a Commande with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Commande.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Commande was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Commande with id=${id}. Maybe Commande was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Commande with id=" + id
            });
        });
};

// Delete all Commandes from the database.
exports.deleteAll = (req, res) => {
    Commande.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Commandes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all commandes."
            });
        });
};