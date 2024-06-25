const db = require("../models");
const Ville = db.villes;
const Op = db.Sequelize.Op;

// Create and Save a new Ville
exports.create = (req, res) => {

    // Save Ville in the database
    Ville.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ville."
            });
        });
};

// Retrieve all Villes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Ville.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving villes."
            });
        });
};

// Find a single Ville with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ville.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Ville with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ville with id=" + id
            });
        });
};

// Update a Ville by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Ville.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ville was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ville with id=${id}. Maybe Ville was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ville with id=" + id
            });
        });
};

// Delete a Ville with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Ville.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ville was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ville with id=${id}. Maybe Ville was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ville with id=" + id
            });
        });
};

// Delete all Villes from the database.
exports.deleteAll = (req, res) => {
    Ville.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Villes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all villes."
            });
        });
};