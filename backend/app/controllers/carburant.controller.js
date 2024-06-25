const db = require("../models");
const Carburant = db.carburants;
const Op = db.Sequelize.Op;

// Create and Save a new Carburant
exports.create = (req, res) => {

    // Save Carburant in the database
    Carburant.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Carburant."
            });
        });
};

// Retrieve all Carburants from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Carburant.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving carburants."
            });
        });
};

// Find a single Carburant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Carburant.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Carburant with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Carburant with id=" + id
            });
        });
};

// Update a Carburant by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Carburant.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Carburant was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Carburant with id=${id}. Maybe Carburant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Carburant with id=" + id
            });
        });
};

// Delete a Carburant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Carburant.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Carburant was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Carburant with id=${id}. Maybe Carburant was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Carburant with id=" + id
            });
        });
};

// Delete all Carburants from the database.
exports.deleteAll = (req, res) => {
    Carburant.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Carburants were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all carburants."
            });
        });
};