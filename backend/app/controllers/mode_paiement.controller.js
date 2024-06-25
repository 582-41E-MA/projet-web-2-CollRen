const db = require("../models");
const Mode_paiement = db.mode_paiements;
const Op = db.Sequelize.Op;

// Create and Save a new Mode_paiement
exports.create = (req, res) => {
    // Validate request
    /*     if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        } */

    // Save Mode_paiement in the database
    Mode_paiement.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Mode_paiement."
            });
        });
};

// Retrieve all Mode_paiements from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Mode_paiement.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mode_paiements."
            });
        });
};

// Find a single Mode_paiement with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Mode_paiement.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Mode_paiement with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Mode_paiement with id=" + id
            });
        });
};

// Update a Mode_paiement by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Mode_paiement.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mode_paiement was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Mode_paiement with id=${id}. Maybe Mode_paiement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Mode_paiement with id=" + id
            });
        });
};

// Delete a Mode_paiement with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Mode_paiement.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mode_paiement was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Mode_paiement with id=${id}. Maybe Mode_paiement was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Mode_paiement with id=" + id
            });
        });
};

// Delete all Mode_paiements from the database.
exports.deleteAll = (req, res) => {
    Mode_paiement.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Mode_paiements were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all mode_paiements."
            });
        });
};