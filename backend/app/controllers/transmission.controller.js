const db = require("../models");
const Transmission = db.transmissions;
const Op = db.Sequelize.Op;

// Create and Save a new Transmission
exports.create = (req, res) => {

    // Save Transmission in the database
    Transmission.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transmission."
            });
        });
};

// Retrieve all Transmissions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Transmission.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transmissions."
            });
        });
};

// Find a single Transmission with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Transmission.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Transmission with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Transmission with id=" + id
            });
        });
};

// Update a Transmission by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Transmission.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transmission was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Transmission with id=${id}. Maybe Transmission was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transmission with id=" + id
            });
        });
};

// Delete a Transmission with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Transmission.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transmission was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Transmission with id=${id}. Maybe Transmission was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transmission with id=" + id
            });
        });
};

// Delete all Transmissions from the database.
exports.deleteAll = (req, res) => {
    Transmission.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Transmissions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all transmissions."
            });
        });
};