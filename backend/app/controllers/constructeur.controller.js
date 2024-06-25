const db = require("../models");
const Constructeur = db.constructeurs;
const Op = db.Sequelize.Op;

// Create and Save a new Constructeur
exports.create = (req, res) => {

    // Save Constructeur in the database
    Constructeur.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Constructeur."
            });
        });
};

// Retrieve all Constructeurs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Constructeur.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving constructeurs."
            });
        });
};

// Find a single Constructeur with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Constructeur.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Constructeur with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Constructeur with id=" + id
            });
        });
};

// Update a Constructeur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Constructeur.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Constructeur was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Constructeur with id=${id}. Maybe Constructeur was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Constructeur with id=" + id
            });
        });
};

// Delete a Constructeur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Constructeur.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Constructeur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Constructeur with id=${id}. Maybe Constructeur was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Constructeur with id=" + id
            });
        });
};

// Delete all Constructeurs from the database.
exports.deleteAll = (req, res) => {
    Constructeur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Constructeurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all constructeurs."
            });
        });
};