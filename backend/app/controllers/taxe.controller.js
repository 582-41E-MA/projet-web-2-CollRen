const db = require("../models");
const Taxe = db.taxes;
const Op = db.Sequelize.Op;

// Create and Save a new Taxe
exports.create = (req, res) => {

    // Save Taxe in the database
    Taxe.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Taxe."
            });
        });
};

// Retrieve all Taxes from the database.
exports.findAll = (req, res) => {


    Taxe.findAll({ include: [{ model: db.provinces }] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving taxes."
            });
        });
};

// Find a single Taxe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Taxe.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Taxe with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Taxe with id=" + id
            });
        });
};

// Update a Taxe by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Taxe.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Taxe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Taxe with id=${id}. Maybe Taxe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Taxe with id=" + id
            });
        });
};

// Delete a Taxe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Taxe.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Taxe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Taxe with id=${id}. Maybe Taxe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Taxe with id=" + id
            });
        });
};

// Delete all Taxes from the database.
exports.deleteAll = (req, res) => {
    Taxe.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Taxes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all taxes."
            });
        });
};