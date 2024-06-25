const db = require("../models");
const Statut = db.statuts;
const Op = db.Sequelize.Op;

// Create and Save a new Statut
exports.create = (req, res) => {

    // Save Statut in the database
    Statut.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Statut."
            });
        });
};

// Retrieve all Statuts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Statut.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving statuts."
            });
        });
};

// Find a single Statut with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Statut.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Statut with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Statut with id=" + id
            });
        });
};

// Update a Statut by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Statut.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Statut was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Statut with id=${id}. Maybe Statut was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Statut with id=" + id
            });
        });
};

// Delete a Statut with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Statut.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Statut was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Statut with id=${id}. Maybe Statut was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Statut with id=" + id
            });
        });
};

// Delete all Statuts from the database.
exports.deleteAll = (req, res) => {
    Statut.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Statuts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all statuts."
            });
        });
};