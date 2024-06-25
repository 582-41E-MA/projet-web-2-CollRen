const db = require("../models");
const Expedition = db.expeditions;
const Op = db.Sequelize.Op;

// Create and Save a new Expedition
exports.create = (req, res) => {

    // Save Expedition in the database
    Expedition.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Expedition."
            });
        });
};

// Retrieve all Expeditions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Expedition.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving expeditions."
            });
        });
};

// Find a single Expedition with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Expedition.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Expedition with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Expedition with id=" + id
            });
        });
};

// Update a Expedition by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Expedition.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Expedition was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Expedition with id=${id}. Maybe Expedition was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Expedition with id=" + id
            });
        });
};

// Delete a Expedition with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Expedition.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Expedition was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Expedition with id=${id}. Maybe Expedition was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Expedition with id=" + id
            });
        });
};

// Delete all Expeditions from the database.
exports.deleteAll = (req, res) => {
    Expedition.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Expeditions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all expeditions."
            });
        });
};