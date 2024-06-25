const db = require("../models");
const Motopropulseur = db.motopropulseurs;
const Op = db.Sequelize.Op;

// Create and Save a new Motopropulseur
exports.create = (req, res) => {

    // Save Motopropulseur in the database
    Motopropulseur.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Motopropulseur."
            });
        });
};

// Retrieve all Motopropulseurs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Motopropulseur.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving motopropulseurs."
            });
        });
};

// Find a single Motopropulseur with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Motopropulseur.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Motopropulseur with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Motopropulseur with id=" + id
            });
        });
};

// Update a Motopropulseur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Motopropulseur.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Motopropulseur was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Motopropulseur with id=${id}. Maybe Motopropulseur was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Motopropulseur with id=" + id
            });
        });
};

// Delete a Motopropulseur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Motopropulseur.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Motopropulseur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Motopropulseur with id=${id}. Maybe Motopropulseur was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Motopropulseur with id=" + id
            });
        });
};

// Delete all Motopropulseurs from the database.
exports.deleteAll = (req, res) => {
    Motopropulseur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Motopropulseurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all motopropulseurs."
            });
        });
};